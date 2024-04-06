import { UserModel } from '../models/user.js'
import { sequelize } from '../config/db.js'
import { AccessTokenModel } from '../models/accessToken.js'
import { HttpError } from '../utils/handleError.js'
import { DateTime } from 'luxon'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class SessionController {

    login = async (req, res, next) => {
        try {

            const { userName, password } = res.locals.body;
            const customer = res.locals.customer;
            const user = await UserModel.findOne({
                where: {
                    userName: userName,
                    status: 1,
                },
            });
            if (!user) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario o contraseña inválidos',
                });
            }

            let permitedSession = false;
            const finalNodeGeneratedHash = user.password.replace('$2y$', '$2a$');
            const correct = await bcrypt.compare(password, finalNodeGeneratedHash);
            if (correct) {
                permitedSession = true;
            }

            // const transaction = await sequelize.transaction();

            if (permitedSession) {
                const SIMULTANEOUS_SESSIONS = { value: 3 };

                const accessToken = await AccessTokenModel.findAll({
                    where: { idUser: user.idUser, revoked: 0 },
                });
                if (SIMULTANEOUS_SESSIONS.value <= accessToken.length) {
                    throw new HttpError({
                        code: 'BAD_REQUEST',
                        message: 'Usted tiene una sesion iniciada en otro terminal. Cierre esa sesión primero',
                    });
                }
                if (user.reset === 1) {
                    const PASSWORD_EXPIRATION_MINUTES = await OptionModel(db).findOne({
                        where: { key: 'PASSWORD_EXPIRATION_MINUTES' },
                    });

                    if (PASSWORD_EXPIRATION_MINUTES) {
                        const now = DateTime.now();
                        const dayLastPassword = DateTime.fromISO(user.lastChangePassword).plus({
                            minutes: PASSWORD_EXPIRATION_MINUTES.value,
                        });

                        if (dayLastPassword < now) {
                            throw new HttpError({
                                code: 'BAD_REQUEST',
                                message:
                                    'Su contraseña temporal ha caducado, vuelva a solicitar una nueva contraseña en el boton "Olvidé mi contraseña',
                            });
                        }
                    }
                }

                const jsonSign = {
                    idUser: user.idUser,
                    userName: user.userName,
                    idGroup: user.idGroup,
                };
                const token = jwt.sign(jsonSign, process.env.TOKEN_JWT, { expiresIn: '7d' });
                const { exp } = jwt.verify(token, process.env.TOKEN_JWT);

                let expiresAt = new Date(exp * 1000).toISOString();

                await AccessTokenModel.create({
                    idUser: user.idUser,
                    token,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    expires_at: expiresAt,
                });

                const response = {
                    message: 'Login authorized',
                    token: token,
                    expirationToken: expiresAt,
                };

                res.json(response);
            } else {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Usuario o contraseñas no válidos',
                });

            }
        } catch (error) {
            // if (transaction) {
            //     await transaction.rollback();
            // }
            next(error);
        }



    }

    logout = async (req, res, next) => {
        try {
            const token = res.locals.token;

            const accessToken = await AccessTokenModel.update({ revoked: 1 }, { where: { token: token } });
            if (!accessToken) {
                throw new HttpError({
                    code: 'BAD_REQUEST',
                    message: 'Token no encontrado',
                });
            }
            res.json({ message: 'Logout success' });
        } catch (error) {
            next(error);
        }
    };

}
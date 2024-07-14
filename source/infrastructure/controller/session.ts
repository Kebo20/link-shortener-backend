import UserModel from '../models/user'
import AccessTokenModel from '../models/accessToken'
import { HttpError } from '../utils/handleError'
import { DateTime } from 'luxon'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";


export class SessionController {

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { email, password } = res.locals.body;
            const user = await UserModel.findOne({
                where: {
                    email: email,
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
            // const finalNodeGeneratedHash = user.password.replace('$2y$', '$2a$');
            const finalNodeGeneratedHash = user.password;

            const correct = await bcrypt.compare(password, finalNodeGeneratedHash);
            if (correct) {
                permitedSession = true;
            }

            // const transaction = await sequelize.transaction();

            if (permitedSession) {
                const SIMULTANEOUS_SESSIONS = { value: 30 };

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
                    const PASSWORD_EXPIRATION_MINUTES = { value: 700 }
                    // await OptionModel(db).findOne({
                    //     where: { key: 'PASSWORD_EXPIRATION_MINUTES' },
                    // });

                    if (PASSWORD_EXPIRATION_MINUTES) {
                        const now = DateTime.now();
                        const dayLastPassword = DateTime.fromISO((user.lastChangePassword).toISOString()).plus({
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
                const JWT_SECRET = process.env.TOKEN_JWT || "kebo24";

                const token = jwt.sign(jsonSign, JWT_SECRET, { expiresIn: '7d' });

                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 7);
                let expiresAt = currentDate;

                await AccessTokenModel.create({
                    idUser: user.idUser,
                    token,
                    created_at: new Date(),
                    updated_at: new Date(),
                    expires_at: expiresAt,
                    revoked: 0
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

    logout = async (req: Request, res: Response, next: NextFunction) => {
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
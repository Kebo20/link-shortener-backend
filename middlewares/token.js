import { HttpError } from '../utils/handleError.js';
import { AccessTokenModel } from '../models/accessToken.js';
import jwt from 'jsonwebtoken'

export const validateToken = async (req, res, next) => {
    try {

        const token = req.headers['x-access-token'];
        if (!token) {
            throw Error('Sesión inválida');
        }



        const decoded = jwt.verify(token, process.env.TOKEN_JWT);

        const accessToken = await AccessTokenModel.findOne({ where: { token, revoked: 0 } });
        if (!accessToken) {
            throw new HttpError({
                code: 'UNAUTHORIZED',
                message: 'Su sesión ha expirado',
            });
        }

        // const now = new Date();
        // const expires_at = new Date(accessToken.expires_at);

        // if (expires_at < now) {
        //     throw new HttpError({
        //         code: 'UNAUTHORIZED',
        //         message: 'Su sesión ha expirado',
        //     });
        // }

        res.locals.token = token;
        res.locals.tokenResponse = decoded;


        next();

    } catch (error) {

        if (error.message === 'jwt expired') {
            error = {
                code: 'UNAUTHORIZED',
                message: 'Su sesión ha expirado.',
            }
        } else {
            error = {
                code: 'FORBIDEN',
                message: error.message,
            }
        }
        next(error);


    }
};
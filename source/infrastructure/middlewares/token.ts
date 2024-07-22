import { HttpError } from '../utils/handleError';
import { AccessTokenModel } from '../model/accessToken';
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers['x-access-token'];
        if (!token) {
            throw Error('Sesión inválida');
        }


        const JWT_SECRET = process.env.TOKEN_JWT || "kebo24";

        const decoded = jwt.verify(`${token}`, JWT_SECRET);

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

        // } catch (error) {

        //     if (error.message === 'jwt expired') {
        //         error = {
        //             code: 'UNAUTHORIZED',
        //             message: 'Su sesión ha expirado.',
        //         }
        //     } else {
        //         error = {
        //             code: 'FORBIDEN',
        //             message: error.message,
        //         }
        //     }
        //     next(error);


        // }

    } catch (error) {


        if (error instanceof Error) {
            if (error.message === 'jwt expired') {
                error = {
                    code: 'UNAUTHORIZED',
                    message: 'Su sesión ha expirado.',
                }
            } else {
                error = {
                    code: 'FORBIDDEN',
                    message: error.message,
                }
            }
        } else {
            // Manejar el caso en que error no es una instancia de Error
            error = {
                code: 'INTERNAL_SERVER',
                message: 'Ocurrió un error desconocido.',
            }
        }

        next(error);
    }
};
import { ObjectEncodingOptions } from 'fs';
import { HttpError } from '../utils/handleError';
import { NextFunction, Request, Response } from "express";

const roles: Record<number, string[]> = {
    1: ['user'],
    2: ['other-module']
}

export const validatorPermissions = (permission: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idGroup, idUser, userName } = res.locals.tokenResponse;
            const { path } = req

            if (!roles[idGroup].includes(permission)) {

                throw new HttpError({
                    code: 'FORBIDDEN',
                    message: 'No tiene los permisos necesarios para realizar esta acción',

                });
            }


            next();
        } catch (err) {
            next(err);
        }
    };
}




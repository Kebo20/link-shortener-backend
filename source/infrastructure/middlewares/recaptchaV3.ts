import { HttpError } from '../utils/handleError';
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const validateTokenRecaptcha = async (req: Request, res: Response, next: NextFunction) => {

    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

    try {


        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: req.body.token,
            },
        });

        if (response.data.success && response.data.score >= 0.5) { // Puedes ajustar el umbral del score según tu necesidad
            next();
        } else {
            throw new HttpError({
                code: 'FORBIDDEN',
                message: 'Recaptcha no válido',
            });

        }


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
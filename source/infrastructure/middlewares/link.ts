import z from 'zod'
import { HttpError } from '../utils/handleError';
import { NextFunction, Request, Response } from "express";

export const validatorRegisterLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = req.body;

        const schema = z.object({
            originalUrl: z.string().url().refine((url) => !url.startsWith(`${process.env.FRONTEND_HOST}`), {
                message: `La URL no puede comenzar con ${process.env.FRONTEND_HOST}`,
            }),
            description: z.string().min(0).max(250).optional(),
            password: z.string().min(4).max(8).optional(),
            shortUrl: z.string().min(6).max(250).optional().refine((url) => url === undefined || /^[a-zA-Z0-9]+$/.test(url), {
                message: "La URL corta solo debe contener caracteres alfanuméricos",
            })


        }).partial({
            description: true,
            password: true,
            shortUrl: true,

        }).required({
            originalUrl: true
        });

        const resultValidateData = schema.safeParse(input)

        if (!resultValidateData.success) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: resultValidateData.error.message,
            });
        } else {
            res.locals.body = resultValidateData.data
            console.log(resultValidateData.data)
        }


        next();
    } catch (err) {
        next(err);
    }
};

export const validatorShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = req.params;

        const schema = z.object({
            shortUrl: z.string()

        }).required({
            shortUrl: true
        });

        const resultValidateData = schema.safeParse(input)

        if (!resultValidateData.success) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: resultValidateData.error.message,
            });
        } else {
            res.locals.body = resultValidateData.data
            console.log(resultValidateData.data)
        }


        next();
    } catch (err) {
        next(err);
    }
};

export const validatorPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = req.body;

        const schema = z.object({
            password: z.string(),
            shortUrl: z.string().min(6).max(250)
        }).required({
            password: true,
            shortUrl: true
        });

        const resultValidateData = schema.safeParse(input)

        if (!resultValidateData.success) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: resultValidateData.error.message,
            });
        } else {
            res.locals.body = resultValidateData.data
            console.log(resultValidateData.data)
        }


        next();
    } catch (err) {
        next(err);
    }
};




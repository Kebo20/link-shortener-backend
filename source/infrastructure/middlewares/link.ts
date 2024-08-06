import z from 'zod'
import { HttpError } from '../utils/handleError';
import { NextFunction, Request, Response } from "express";

export const validatorRegisterLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = req.body;

        const schema = z.object({
            originalUrl: z.string().url(),
            description: z.string().min(0).max(250).optional(),
            password: z.string().min(4).max(8).optional()

        }).partial({
            description: true,
            password: true
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
            shortUrl: z.string().min(6).max(6)
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




import z from 'zod'
import { HttpError } from '../utils/handleError';
import { NextFunction, Request, Response } from "express";

export const validatorLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = req.body;

        const schema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const resultValidateData = schema.safeParse(input)

        if (!resultValidateData.success) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: JSON.parse(resultValidateData.error.message),
            });
        } else {
            res.locals.body = resultValidateData.data
        }


        next();
    } catch (err) {
        next(err);
    }
};

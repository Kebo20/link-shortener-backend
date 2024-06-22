import z from 'zod'
import { HttpError } from '../utils/handleError.js';

export const validatorRegisterUser = async (req, res, next) => {
    try {
        const input = req.body;

        const schema = z.object({
            userName: z.string().min(4).max(15),
            email: z.string().email().min(1).max(250),
            password: z.string().min(8),
            firstName: z.string().min(1).max(250),
            lastName: z.string().min(1).max(250),
            document: z.string().min(8).max(16),
            sex: z.enum(['F', 'M']),
            address: z.string().min(1).max(250).optional(),
            phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).optional(), // Valida que el campo sea una cadena de caracteres que cumpla con un formato de número de teléfono internacional
            birthDate: z.coerce.date().max(new Date())

        }).partial().required("userName", "password", "firstName", "lastName", "document", "sex", "birthDate")

        const resultValidateData = schema.safeParse(input)

        if (!resultValidateData.success) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: JSON.parse(resultValidateData.error.message),
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

export const validatorUpdateUser = async (req, res, next) => {
    try {
        const input = { ...req.body, id: req.params.id };
        const schema = z.object({
            id: z.string().uuid(),
            userName: z.string().min(4).max(15),
            email: z.string().email().min(1).max(250),
            password: z.string().min(8),
            firstName: z.string().min(1).max(250),
            lastName: z.string().min(1).max(250),
            document: z.string().min(8).max(16),
            sex: z.enum(['F', 'M']),
            address: z.string().min(1).max(250).optional(),
            phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).optional(), // Valida que el campo sea una cadena de caracteres que cumpla con un formato de número de teléfono internacional
            birthDate: z.coerce.date().max(new Date())

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

export const validatorDeleteUser = async (req, res, next) => {
    try {
        const input = { id: req.params.id };
        const schema = z.object({
            id: z.string().uuid()
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

import z from 'zod'
import { HttpError } from '../utils/handleError.js';

// const movieSchema = z.object({
//     title: z.string({
//         invalid_type_error: 'Movie title must be a string',
//         required_error: 'Movie title is required.'
//     }),
//     year: z.number().int().min(1900).max(2024),
//     director: z.string(),
//     duration: z.number().int().positive(),
//     rate: z.number().min(0).max(10).default(5),
//     poster: z.string().url({
//         message: 'Poster must be a valid URL'
//     }),
//     genre: z.array(
//         z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
//         {
//             required_error: 'Movie genre is required.',
//             invalid_type_error: 'Movie genre must be an array of enum Genre'
//         }
//     )
// })

// export function validateMovie(input) {
//     return movieSchema.safeParse(input)
// }

// export function validatePartialMovie(input) {
//     return movieSchema.partial().safeParse(input)
// }


export const validatorCreate = async (req, res, next) => {
    try {
        const input = req.body;

        const movieSchema = z.object({
            title: z.string({
                invalid_type_error: 'Movie title must be a string',
                required_error: 'Movie title is required.'
            }),
            year: z.number().int().min(1900).max(2024),
            director: z.string(),
            duration: z.number().int().positive(),
            rate: z.number().min(0).max(10).default(5),
            poster: z.string().url({
                message: 'Poster must be a valid URL'
            }),
            genre:
                // z.array(
                z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
            //     {
            //         required_error: 'Movie genre is required.',
            //         invalid_type_error: 'Movie genre must be an array of enum Genre'
            //     }
            // )
        })

        const resultValidateData = movieSchema.safeParse(input)
        // console.log(resultValidateData.error)

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

export const validatorFilter = async (req, res, next) => {
    try {
        const input = req.body;
        const movieSchema = z.object({
            title: z.string({
                invalid_type_error: 'Movie title must be a string',
                required_error: 'Movie title is required.'
            }),
            year: z.number().int().min(1900).max(2024),
            director: z.string(),
            duration: z.number().int().positive(),
            rate: z.number().min(0).max(10).default(5),
            poster: z.string().url({
                message: 'Poster must be a valid URL'
            }),
            genre: z.array(
                z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
                {
                    required_error: 'Movie genre is required.',
                    invalid_type_error: 'Movie genre must be an array of enum Genre'
                }
            )
        })

        const resultValidateData = movieSchema.partial().safeParse(input)

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

export const validatorUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const input = { id, ...req.body };


        const movieSchema = z.object({
            id: z.string().uuid(),
            title: z.string({
                invalid_type_error: 'Movie title must be a string',
                required_error: 'Movie title is required.'
            }),
            year: z.number().int().min(1900).max(2024),
            director: z.string(),
            duration: z.number().int().positive(),
            rate: z.number().min(0).max(10).default(5).optional(),
            poster: z.string().url({
                message: 'Poster must be a valid URL'
            }),
            genre: z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        })

        const resultValidateData = movieSchema.safeParse(input)

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

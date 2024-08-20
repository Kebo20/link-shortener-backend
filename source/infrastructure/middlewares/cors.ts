import cors from 'cors'
import { HttpError } from '../utils/handleError';

const ACCEPTED_ORIGINS = [
    'http://linkevo',
    'https://test.tecda.pe',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://linkevo.app'
]



export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        console.log(origin)
        if (acceptedOrigins.includes(`${origin}`)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)

            // return callback(new HttpError({
            //     code: 'FORBIDDEN',
            //     message: 'Not allowed by CORS',
            // }))
        }

        // return callback(new Error('Not allowed by CORS'))
        return callback(new HttpError({
            code: 'FORBIDDEN',
            message: 'Not allowed by CORS' + origin,
        }))


    }
})
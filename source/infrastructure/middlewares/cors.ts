import cors from 'cors'
import { HttpError } from '../utils/handleError';

const ACCEPTED_ORIGINS = [
    // 'http://localhost:8080',
    // 'http://localhost:1234',
    // 'https://movies.com',
    'https://midu.dev'
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
            message: 'Not allowed by CORS',
        }))


    }
})
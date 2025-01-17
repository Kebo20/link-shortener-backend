import express, { json } from "express";
import 'dotenv/config'
import { corsMiddleware } from './infrastructure/middlewares/cors'
import { routerExpress } from './infrastructure/route/index'
import { routerExpress as routerExpress2 } from './infrastructure/route/index2'

import { errorHandler } from "./infrastructure/utils/handleError";
import { swagger } from "./swagger/index"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
process.env.TZ = 'America/Lima';

const app = express()
app.use(json())
app.use(corsMiddleware())
app.use(helmet()) //AÑADE CABECERAS DE SEGURIDAD
app.disable('x-powered-by') //POR SEGURIDAD

const PORT = process.env.PORT ?? 5000

const limiter = rateLimit({
    windowMs: 1000 * 60,// en milisegundos
    max: 200, // Límite de solicitudes por IP en la ventana especificada
    message: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde.',
    }
});

swagger('/swagger', app)

app.use(limiter)
app.use('/api/v1', routerExpress)
app.use('/', routerExpress2)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`ESCUCHANDO EN PUERTO: ${PORT}`)
})
import winston from 'winston';
import 'winston-daily-rotate-file';

// Configuración del transporte para rotación diaria de archivos
const transportFile = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%.json', // Nombre del archivo con patrón de fecha
    datePattern: 'YYYY-MM-DD', // Patrón de fecha para los archivos
    maxSize: '20m', // Tamaño máximo del archivo antes de rotar
    // maxFiles: '14d', // Número de días para guardar archivos rotados
    format: winston.format.combine(
        // winston.format.timestamp({
        //     format: 'YYYY-MM-DD HH:mm:ss' // Formato personalizado para este transport
        // }),
        winston.format.timestamp(),
        winston.format.json()
    ),
});


// Crear el logger
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de log que se registrará
    format: winston.format.combine( //Formato para todos los transports usados
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        transportFile
    ],
});

interface dataLog {
    message: any
    stack?: string,
    path: string,
    method: string,
    code: string,
    statusCode: number,
    params: object,
    body: object,
    query: object,
    locals: object,
    userAgent?: string,
    ipAdress?: string,
    headers: object
}
const generateCustomId = () => {
    const prefix = 'LOG';
    const uniquePart = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return `${prefix}-${uniquePart}`;
};
export const saveLog = (data: dataLog) => {

    const { message, ...oData } = data
    const { statusCode } = data
    const idLog = generateCustomId()
    const logData = { ...oData, idLog }


    if (statusCode >= 500) {
        logger.error(message, logData)
    }
    else if (statusCode >= 400) {

        logger.warn(message, logData)

    } else if (statusCode >= 200) {
        logger.info(message, logData)
    }


    return { idLog }

}

export default logger

import { saveLog } from './logger';

interface TableCodes {
    [key: string]: number;
}

const TableCodes: TableCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

class HttpError extends Error {
    code: string;
    constructor({ code, message }: { code: string; message: string }) {
        super(message);
        this.code = code;

    }
}

import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    let code = err.code ?? 'INTERNAL_SERVER'
    const statusCode = TableCodes[code]
    const errorMessage = validateJson(err.message ?? err)

    const { idLog } = saveLog({
        message: errorMessage,
        stack: err.stack,
        path: req.path,
        method: req.method,
        code: code,
        statusCode: statusCode,
        body: req.body,
        query: req.query,
        params: req.params,
        locals: res.locals,
        headers: req.headers,
        userAgent: req.headers['user-agent'],
        ipAdress: `${req.headers['x-forwarded-for']}` || `${req.socket.remoteAddress}` || `${req.ip}`

    })

    res.status(statusCode).json({ code, message: statusCode < 500 ? errorMessage : 'Ocurrió un error en el sistema', ID: idLog });


};


const validateJson = (json: string) => {

    try {
        const jsonParse = JSON.parse(json)
        return jsonParse
    } catch (error) {
        return json

    }

}

export { HttpError, errorHandler };

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
    res.status(statusCode).json({ code, message: validateJson(err.message) });
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

interface TableCodes {
    [key: string]: number;
}

const TableCodes: TableCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
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
    const statusCode = TableCodes[err.code] || TableCodes.INTERNAL_SERVER;
    res.status(statusCode).json({ code: err.code, message: err.message });
};

export { HttpError, errorHandler };

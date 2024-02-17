const TableCodes = {
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
    constructor({ code, message }) {
        super();
        this.code = code;
        this.message = message;
    }
}


const errorHandler = (err, req, res, next) => {
    if (TableCodes[err.code]) {
        res.status(TableCodes[err.code]).json({ code: err.code, message: err.message });
    } else {

        res.status(TableCodes.INTERNAL_SERVER).json({ code: 'INTERNAL_SERVER', message: err.message });
    }
};


export { HttpError, errorHandler };

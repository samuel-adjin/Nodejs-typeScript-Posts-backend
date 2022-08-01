import {
    StatusCodes,
} from 'http-status-codes';

class BaseError extends Error {
    public readonly name: string;
    public readonly  statusCode: StatusCodes;
    public readonly isOperational: boolean;
    constructor(message: string, statusCode: StatusCodes, isOperational: boolean, name: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }

}

export default BaseError;
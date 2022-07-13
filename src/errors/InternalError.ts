import BaseError from "./BaseError";
import {
    StatusCodes,
} from 'http-status-codes';
class InternalError extends BaseError{

    constructor(name: string, message="Internal Server error", statusCode = StatusCodes.INTERNAL_SERVER_ERROR , isOperational=true ){
        super(message,statusCode,isOperational,name);
    }
}

export default InternalError;
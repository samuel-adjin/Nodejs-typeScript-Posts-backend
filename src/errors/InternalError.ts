import BaseError from "./BaseError";
import {
    StatusCodes,
} from 'http-status-codes';
class InternalError extends BaseError{

    constructor(message="Internal Server error", statusCode = StatusCodes.INTERNAL_SERVER_ERROR , isOperational=true, name: string){
        super(message,statusCode,isOperational,name);
    }
}

export default InternalError;
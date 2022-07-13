import BaseError from "./BaseError";
import {
    StatusCodes,
} from 'http-status-codes';
class ApiError404 extends BaseError{

    constructor(name: string, message="not found", statusCode=StatusCodes.NOT_FOUND , isOperational=true){
        super(message,statusCode,isOperational,name);
    }
}

export default ApiError404;
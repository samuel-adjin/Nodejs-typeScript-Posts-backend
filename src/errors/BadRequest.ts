import BaseError from "./BaseError";
import {
    StatusCodes,
} from 'http-status-codes';
class BadRequest extends BaseError{

    constructor(name: string, statusCode=StatusCodes.BAD_REQUEST ,message="Bad request", isOperational=true ){
        super(message,statusCode,isOperational,name);
    }
}

export default BadRequest;
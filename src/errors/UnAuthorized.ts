import BaseError from "./BaseError";
import {
    StatusCodes,
} from 'http-status-codes';
class UnAuthorized extends BaseError{

    constructor(name: string, message="UnAuthorize", statusCode = StatusCodes.UNAUTHORIZED, isOperational=true ){
        super(message,statusCode,isOperational,name);
    }
}

export default UnAuthorized;
import BaseError from "./BaseError";
import logger from "../loggers/logger";


class ErrorHandler {
    public async handleError(err: Error): Promise<void> {
       await logger.error(
            'Error message from the centralized error-handling component',
            err
        );

    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}
 const errorHandler = new ErrorHandler();
 export default errorHandler
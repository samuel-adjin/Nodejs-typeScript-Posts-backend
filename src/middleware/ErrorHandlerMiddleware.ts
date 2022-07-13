
import { Request, Response,NextFunction } from "express";
import errorHandler from "../errors/errorHandler"

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction)=>{
    if (!errorHandler.isTrustedError(err)) {
        next(err);
        return;
      }
      await errorHandler.handleError(err);
     }

     export default errorHandlerMiddleware
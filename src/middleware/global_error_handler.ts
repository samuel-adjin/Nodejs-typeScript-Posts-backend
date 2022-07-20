import { Request,Response,NextFunction } from "express";
import BaseError  from "../errors//BaseError";
import logger from "../loggers/logger"


const globalErrorHandler = (error:Error, req:Request,res:Response,next:NextFunction)=>{
    if(error instanceof BaseError ){
        logger.error("in global",error);
        return res.status(error.statusCode).json({status:"fail",msg: error.message})
    }
}

export default globalErrorHandler;
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import BadRequest from "../errors/BadRequest";
import logger from "../loggers/logger"
import { StatusCodes } from "http-status-codes";


const { user } = new PrismaClient();

const checkRole = async (role: string[] | string, req: Request, res: Response, next: NextFunction) => {
    try {
        let isArray: Boolean = Array.isArray(role);

        const userId: number | undefined = req.user?.userId;
        const findUser = await user.findUnique({
            where: {
                id: userId
            }
        });
        if (!isArray && role === findUser?.role!) {
            return next();
        }
        if (isArray && role.includes(findUser?.role!)) {
            return next();
        }
        throw new BadRequest("Invalid user", StatusCodes.UNAUTHORIZED)
        // return res.status(StatusCodes.UNAUTHORIZED).json({success:false,msg:"Invalid user"})

    } catch (error) {
        logger.error("Failed to check role", error)
    }
}


export default { checkRole }
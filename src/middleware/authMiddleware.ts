import { Request, Response, NextFunction } from "express";
import constant from "../constant/constant";
import jwt, { JwtPayload } from "jsonwebtoken";
import BadRequest from "../errors/BadRequest";
import logger from "../loggers/logger"


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        if (typeof authHeader !== 'string' || authHeader === '' || !authHeader.startsWith('Bearer ') || !authHeader) {
            throw new BadRequest(constant.TOKEN.INVALID_TOKEN)
        }
        const acessToken = authHeader.split(' ')[1];

        const verifyToken: string | JwtPayload = jwt.verify(acessToken, process.env.ACCESS_TOKEN!)
        if (!verifyToken) {
            throw new BadRequest(constant.TOKEN.EXPIRED_TOKEN)
        }

        const { username, role, email, userId } = verifyToken as jwt.JwtPayload;
        req.user = { username, role, userId, email };

        next();
    } catch (error) {
        logger.error("Error verifying access token", error)
        next(error)
    }
}

const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.headers['X-HEADER-TOKEN'];
        if (!refreshToken || typeof refreshToken !== 'string' || refreshToken === '') {
            throw new BadRequest(constant.TOKEN.INVALID_TOKEN)
        }
        const verifyToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN!);
        if (!verifyToken) {
            throw new BadRequest(constant.TOKEN.EXPIRED_TOKEN)
        }
        const { username, role, email, userId } = verifyToken as jwt.JwtPayload;
        req.user = { username, role, userId, email };
        next();
    } catch (error) {
        logger.error("Error verifying refresh token", error)
        next(error)
    }
}


export default { verifyRefreshToken, verifyToken }
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import constant from "../../constant/constant";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailHelper from '../../services/email';
import jwtHelper from '../../helpers/jwt';
import { StatusCodes } from "http-status-codes";
import logger from "../../loggers/logger";
import notFound from "../../errors/ApiError404"
import BadRequest from "../../errors/BadRequest"
import generator from "generate-password";
import queue from '../../jobs/baseQueue'

dotenv.config();
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const register = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { username, email, plainPassword, firstName, middleName, lastName, mobile } = req.body;
        const password = await bcrypt.hash(plainPassword, 10);
        let userDetails: Prisma.UserCreateInput;
        if (middleName === null || !middleName) {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
                password,
                mobile
            }
        } else {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
                middleName,
                password,
                mobile
            }
        }


        const newUser = await prisma.user.create({
            data: userDetails
        })
       
        const emailToken = jwt.sign({ username, email }, process.env.EMAIL_TOKEN!)
        const link:string =`${req.protocol}://${req.headers.host}/api/v1/auth/verify-email?token=${emailToken}`
        const data = emailHelper.emailData(newUser.email,link,newUser.username);


        if (newUser) {
             // add email data to queue
            await queue.baseQueue.add('email', data)
            res.status(StatusCodes.CREATED).json({ success: true, data: newUser })
        }
    } catch (error) {
        logger.error("User not registered", error)
        next(error)
    }

}

//login
const login = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { username, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!existingUser) {
            throw new notFound(constant.Auth.IncorrectCredential)
        }
        const verifyPassword = await bcrypt.compare(password, existingUser?.password);
        if (!verifyPassword) {
            throw new BadRequest(constant.Auth.IncorrectCredential)
        }

        if (!existingUser.isVerfiied) {
            throw new BadRequest(constant.Auth.emailNotVerified, StatusCodes.UNAUTHORIZED)
        }

        if (existingUser.isLocked) {
            throw new BadRequest(constant.Auth.emailNotVerified, StatusCodes.LOCKED)
        }
        //Generate Jwt Tokens
        const userData: Object = { username, userId: existingUser.id, email: existingUser.email, role: existingUser.role };
        const access_token = jwtHelper.generateJwt(userData, process.env.ACCESS_TOKEN!, `${process.env.ACCESS_EXPIRES}m`);
        const refresh_token = jwtHelper.generateJwt(userData, process.env.REFRESH_TOKEN!, `${process.env.REFRESH_EXPIRES}d`)
        res.status(StatusCodes.OK).json({ success: true, data: { access_token, refresh_token } });

    } catch (error) {
        logger.error("User cannot login", error);
        next(error)
    }
}


// verify email
const verifyEmail = async (req: Request, res: Response,next:NextFunction) => {
    {
        try {
            const { token } = req.query;
            if (typeof token != 'string') {
                throw new BadRequest(constant.Auth.InvalidLink)
            }

            const decodedToken = jwt.verify(token, process.env.EMAIL_TOKEN!);

            if (!decodedToken) {
                throw new BadRequest(constant.Auth.InvalidLink)

            }
            const { email } = decodedToken as JwtPayload;
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!existingUser) {
                throw new notFound(constant.Auth.UserNotFound)

            }
            const verifyUserEmail = await prisma.user.update({
                where: { email },
                data: {
                    isVerfiied: true
                }
            })

            if (verifyUserEmail) {
                return res.status(StatusCodes.OK).json({ success: true, msg: constant.Auth.EmailVerified })
            }

        } catch (error) {
            logger.error("Email verification failed", error)
            next(error)

        }
    }
}


//ResetLink
const resetLink = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { email } = req.body;
        const getUser = await prisma.user.findUnique({
            where: { email }
        });
        if (!email) {
            throw new notFound(constant.Auth.InvalidEmail)
        }
        const resetLink = jwt.sign({ email }, process.env.RESET_LINK!);
        // add email data to queue`
         const link:string = `${req.protocol}://${req.headers.host}/api/v1/auth/reset-password?token=${resetLink}`;
        const data = emailHelper.emailData(email,link,getUser?.username!);
        await queue.baseQueue.add(constant.JOBS.RESETLINK, data)
        res.status(StatusCodes.OK).json({ success: true, msg: constant.EMAIL.RESET_SUCCESS })
    } catch (error) {
        logger.error("Password reset link failed", error)
        next(error)
    }
}


//password reset
const resetPassword = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { token } = req.query;
        const { plainPassword, confirmPassword } = req.body;
        if (typeof token != 'string') {
            throw new BadRequest(constant.Auth.InvalidLink)

        }
        const decodedLink = jwt.verify(token, process.env.RESET_LINK!)
        const { email } = decodedLink as jwt.JwtPayload
        const userExist = await prisma.user.findUnique({ where: { email } });
        if (!userExist) {
            throw new notFound(constant.Auth.UserNotFound)

        }

        if (plainPassword !== confirmPassword) {
            throw new BadRequest(constant.Auth.passwordMatchError)
        }

        const password = await bcrypt.hash(plainPassword, 10);
        await prisma.user.update({
            where: { email },
            data: {
                password
            }
        });
        res.status(StatusCodes.OK).json({ success: true, msg: constant.Auth.PasswordResetSuccess })
    } catch (error) {
        logger.error("Password reset failed", error)
        next(error)
    }

}


//generate tokens using refresh token
const token = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const id = req.user?.userId;
        const findUser = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!findUser) {
            throw new notFound(constant.Auth.INVALIDUSER)
        }

        const userData: Object = { email: findUser?.email, role: findUser?.role, userId: findUser?.id, username: findUser?.username };
        const access_token = jwtHelper.generateJwt(userData, process.env.ACCESS_TOKEN!, `${process.env.ACCESS_EXPIRES}s`);
        const refresh_token = jwtHelper.generateJwt(userData, process.env.REFRESH_TOKEN!, `${process.env.REFRESH_EXPIRES}d`)
        res.status(StatusCodes.OK).json({ success: true, data: { access_token, refresh_token } });
    } catch (error) {
        logger.error("refresh token generation failed", error)
        next(error)
    }
}


const adminCreateUser = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const { email, firstName, lastName, mobile } = req.body;
        const emailExist = await prisma.user.findUnique({
            where: { email }
        });
        if (emailExist) {
            throw new BadRequest(constant.Auth.EmailError)
        }
        const password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            strict: true
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                username: email,
                password:hashedPassword,
                role: "EDITOR",
                firstName,
                lastName,
                mobile
            }
        });
     
        const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN!)
        const link:string = `${req.protocol}://${req.headers.host}/api/v1/auth/verify-email?token=${emailToken}`
        const data = emailHelper.emailData( email,link,firstName,password);
           // add email data to queue
        await queue.baseQueue.add(constant.JOBS.ADMINCREATED, data)
        if (newUser) {
            res.status(StatusCodes.CREATED).json({ success: true, data: newUser })
        }

    } catch (error) {
        logger.error("Admin creation of user failed",error)
        next(error)
    }
}


export default { register, login, verifyEmail, token, resetLink, resetPassword, adminCreateUser };
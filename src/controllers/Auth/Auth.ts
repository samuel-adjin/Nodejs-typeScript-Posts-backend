import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import constant from "../../constant/constant";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailHelper from '../../helpers/email';
import emailQueue from '../../jobs/emailJob';
import jwtHelper from '../../helpers/jwt';
import { StatusCodes } from "http-status-codes";
import logger from "../../loggers/logger";
import notFound from "../../errors/ApiError404"
import BadRequest from "../../errors/BadRequest"

dotenv.config();
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const register = async (req: Request, res: Response) => {
    try {
        const { username, email, plainPassword, firstName, middleName, lastName } = req.body;
        const password = await bcrypt.hash(plainPassword, 10);
        let userDetails: Prisma.UserCreateInput;
        if (middleName === null || !middleName) {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
                password
            }
        } else {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
                middleName,
                password
            }
        }
        const newUser = await prisma.user.create({
            data: userDetails
        })
        // send email
        const emailToken = jwt.sign({ username, email }, process.env.EMAIL_TOKEN!)
        const html = `<h3>Hello,${newUser.username}</h3>
           <p>Thanks for signing up with farad, Click the link below to verify your email</p>
            <a href ="${req.protocol}://${req.headers.host}/api/v1/auth/verify-email?token=${emailToken}"> verify email </a>`

        const data = emailHelper.emailData(process.env.EMAIL_ADDRESS!, email, constant.EMAIL.EMAIL_SUBJECT, html);

        const emailData = await emailHelper.emailConfirmation(data)
        await emailQueue.add('emailJob', emailData);
        if (newUser) {
            res.status(StatusCodes.CREATED).json({ success: true, data: newUser })
        }
    } catch (error) {
        logger.error("User not registered", error)
    }

}

//login
const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!existingUser) {
            throw new notFound(constant.Auth.IncorrectCredential)
            // return res.status(400).json(constant.Auth.IncorrectCredential)
        }
        const verifyPassword = await bcrypt.compare(password, existingUser?.password);
        if (!verifyPassword) {
            throw new BadRequest(constant.Auth.IncorrectCredential)
            // return res.status(400).json(constant.Auth.IncorrectCredential)
        }

        if (!existingUser.isVerfiied) {
            throw new BadRequest(constant.Auth.emailNotVerified, StatusCodes.UNAUTHORIZED)
            // return res.status(400).json(constant.Auth.emailNotVerified)
        }

        if (existingUser.isLocked) {
            throw new BadRequest(constant.Auth.emailNotVerified, StatusCodes.LOCKED)
            // return res.status(400).json(constant.Auth.accountLocked)
        }
        //Generate Jwt Tokens
        const userData: Object = { username, userId: existingUser.id, email: existingUser.email, role: existingUser.role };
        const access_token = jwtHelper.generateJwt(userData, process.env.ACCESS_TOKEN!, `${process.env.ACCESS_EXPIRES}m`);
        const refresh_token = jwtHelper.generateJwt(userData, process.env.REFRESH_TOKEN!, `${process.env.REFRESH_EXPIRES}d`)
        res.status(StatusCodes.OK).json({ success: true, data: { access_token, refresh_token } });

    } catch (error) {
        logger.error("User cannot login", error)
    }
}


// verify email
const verifyEmail = async (req: Request, res: Response) => {
    {
        try {
            const { token } = req.query;
            if (typeof token != 'string') {
                throw new BadRequest(constant.Auth.InvalidLink)
                // return res.status(400).json(constant.Auth.InvalidLink)
            }

            const decodedToken = jwt.verify(token, process.env.EMAIL_TOKEN!);

            if (!decodedToken) {
                throw new BadRequest(constant.Auth.InvalidLink)
                // return res.status(400).json(constant.Auth.InvalidLink)
            }
            const { email } = decodedToken as JwtPayload;
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!existingUser) {
                throw new notFound(constant.Auth.UserNotFound)
                // return res.status(400).json(constant.Auth.UserNotFound)
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

        }
    }
}


//ResetLink
const resetLink = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const getUser = await prisma.user.findUnique({
            where: { email }
        });
        if (!email) {
            throw new notFound(constant.Auth.InvalidEmail)
            // return res.status(400).json(constant.Auth.InvalidEmail)
        }
        const resetLink = jwt.sign({ email }, process.env.RESET_LINK!);
        //send email with reset Link
        const html = `<h3>Hello,${getUser?.username}</h3>
        <p>You have requested to reset your password, Click the link below to reset your password</p>
         <a href ="${req.protocol}://${req.headers.host}/api/v1/auth/reset-password?token=${resetLink}"> verify email </a>`
        const data = emailHelper.emailData(process.env.EMAIL_ADDRESS!, email, constant.EMAIL.PASSWORD_RESET, html);
        const emailData = await emailHelper.emailConfirmation(data)
        emailQueue.add('emailJob', emailData);
        res.status(StatusCodes.OK).json({ success: true, msg: constant.EMAIL.RESET_SUCCESS })
    } catch (error) {
        logger.error("Password reset link failed", error)
    }
}


//password reset
const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        const { plainPassword, confirmPassword } = req.body;
        if (typeof token != 'string') {
            throw new BadRequest(constant.Auth.InvalidLink)
            // return res.status(400).json(constant.Auth.InvalidLink)
        }
        const decodedLink = jwt.verify(token, process.env.RESET_LINK!)
        const { email } = decodedLink as jwt.JwtPayload
        const userExist = await prisma.user.findUnique({ where: { email } });
        if (!userExist) {
            throw new notFound(constant.Auth.UserNotFound)
            // return res.status(400).json(constant.Auth.UserNotFound)
        }

        // if (plainPassword !== confirmPassword) {
        //     return res.status(400).json(constant.Auth.passwordMatchError);
        // }

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

    }

}


//generate tokens using refresh token
const token = async (req: Request, res: Response) => {
    try {
        const id = req.user?.userId;
        const findUser = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!findUser) {
            throw new notFound(constant.Auth.INVALIDUSER)
            // return res.status(400).json({ success: false, msg: constant.Auth.INVALIDUSER })
        }

        const userData: Object = { email: findUser?.email, role: findUser?.role, userId: findUser?.id, username: findUser?.username };
        const access_token = jwtHelper.generateJwt(userData, process.env.ACCESS_TOKEN!, `${process.env.ACCESS_EXPIRES}s`);
        const refresh_token = jwtHelper.generateJwt(userData, process.env.REFRESH_TOKEN!, `${process.env.REFRESH_EXPIRES}d`)
        res.status(StatusCodes.OK).json({ success: true, data: { access_token, refresh_token } });
    } catch (error) {
        logger.error("refresh token generation failed", error)
    }
}


export default { register, login, verifyEmail, token, resetLink, resetPassword };
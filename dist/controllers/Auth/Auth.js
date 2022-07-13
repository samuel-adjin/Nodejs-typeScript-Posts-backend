"use strict";
// import { Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
// import constant from "../../constant/constant";
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import emailHelper from '../../helpers/email';
// import emailQueue from '../../jobs/emailJob';
// import jwtHelper from '../../helpers/jwt';
// import InternalError from "errors/InternalError";
// import { StatusCodes } from "http-status-codes";
// dotenv.config();
// const { user } = new PrismaClient();
// const register = async (req: Request, res: Response) => {
//     try {
//         const { username, email, plainPassword, confirmPassword } = req.body;
//         const emailExist = await user.findUnique({
//             where: { email }
//         });
//         if (emailExist) {
//             return res.status(400).json(constant.Auth.EmailError)
//         }
//         if (plainPassword !== confirmPassword) {
//             return res.status(400).json(constant.Auth.passwordMatchError);
//         }
//         const usernameExist = await user.findUnique({
//             where: {
//                 username
//             }
//         });
//         if (usernameExist) {
//             return res.status(400).json(constant.Auth.UsernameError)
//         }
//         const password = await bcrypt.hash(plainPassword, 10);
//         const newUser = await user.create({
//             data: {
//                 email,
//                 username,
//                 password
//             }
//         });
//         // send email
//         const emailToken = jwt.sign({ username, email }, process.env.EMAIL_TOKEN!)
//         const html = `<h3>Hello,${newUser.username}</h3>
//            <p>Thanks for signing up with farad, Click the link below to verify your email</p>
//             <a href ="${req.protocol}://${req.headers.host}/api/v1/auth/verify-email?token=${emailToken}"> verify email </a>`
//         const data = emailHelper.emailData(process.env.EMAIL_ADDRESS!, email, constant.EMAIL.EMAIL_SUBJECT, html);
//         const emailData = await emailHelper.emailConfirmation(data)
//         await emailQueue.add('emailJob', emailData);
//         if (newUser) {
//             res.status(201).json({ success: true, data: newUser })
//         }
//     } catch (error) {
//     }
// }
//# sourceMappingURL=Auth.js.map
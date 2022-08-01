import path from 'path';
import ejs from "ejs"
import logger from '../loggers/logger';
import emailService from "../services/email"
import constant from '../constant/constant';
import { Address, AttachmentLike,Options } from 'nodemailer/lib/mailer';
import { Readable } from 'nodemailer/lib/xoauth2';

const sendSignUpSuccessfulMail = async(name:string,email:string,link:string)=>{
    let template:string | Buffer | Readable | AttachmentLike | undefined;
    ejs.renderFile(path.join('views','email.ejs'),{name,link},(err,data)=>{
        if(err){
            logger.error(err)
            throw err
        }
        template = data
    })
    const from:string | Address | undefined = process.env.EMAIL_ADDRESS
    const to: string | Address | Array<string | Address> | undefined = email;
    const subject:string | undefined = constant.EMAIL.EMAIL_SUBJECT
    const msg:Options = {
        from,
        to:to,
        subject,
        html:template

    }
    const sendMail = await emailService.emailConfirmation(msg)

    return sendMail;


}


const sendPasswordResetMail = async(name:string,email:string,link:string)=>{
    let template:string | Buffer | Readable | AttachmentLike | undefined;
    ejs.renderFile(path.join('views','reset-password.ejs'),{name,link},(err,data)=>{
        if(err){
            logger.error(err)
            throw err
        }
        template = data
    })
    const from:string | Address | undefined = process.env.EMAIL_ADDRESS
    const to: string | Address | Array<string | Address> | undefined = email;
    const subject:string | undefined = constant.EMAIL.PASSWORD_RESET
    const msg:Options = {
        from,
        to:to,
        subject,
        html:template

    }
    const sendMail = await emailService.emailConfirmation(msg)

    return sendMail;


}


const sendAdminCreatedMail = async(name:string,email:string,link:string,password:string)=>{
    let template:string | Buffer | Readable | AttachmentLike | undefined;
    ejs.renderFile(path.join('views','admin-user.ejs'),{name,link,password,email},(err,data)=>{
        if(err){
            logger.error(err)
            throw err
        }
        template = data
    })
    const from:string | Address | undefined = process.env.EMAIL_ADDRESS
    const to: string | Address | Array<string | Address> | undefined = email;
    const subject:string | undefined = constant.EMAIL.EMAIL_SUBJECT
    const msg:Options = {
        from,
        to:to,
        subject,
        html:template

    }
    const sendMail = await emailService.emailConfirmation(msg)

    return sendMail;


}



export default {sendSignUpSuccessfulMail,sendPasswordResetMail,sendAdminCreatedMail}
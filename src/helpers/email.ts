import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { Address, AttachmentLike, Options } from 'nodemailer/lib/mailer';
import { Readable } from 'nodemailer/lib/xoauth2';
import dotenv from 'dotenv';
dotenv.config();



const emailConfirmation = async  (msg: Options)=>{
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY!
        })
    );
   await  transport.sendMail(msg)
}




const emailData = (from:string | Address | undefined, to:string | Address | Array<string | Address> | undefined, subject:string | undefined,html:string | Buffer | Readable | AttachmentLike | undefined) =>{
    const msg ={
        from: from,
        to: to,
        subject: subject,
        html: html,
        
    };
    return msg;
}

export default {emailConfirmation,emailData};
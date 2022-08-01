import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { Address, AttachmentLike, Options } from 'nodemailer/lib/mailer';
import { Readable } from 'nodemailer/lib/xoauth2';
import dotenv from 'dotenv';
dotenv.config();



const emailConfirmation = async (msg: Options) => {
    console.log("In method")
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY!
        })
    );
    await transport.sendMail(msg)
}




const emailData = (to: string | Address | Array<string | Address> | undefined, link: string, name: string, password?:string) => {
    const msg = {
        to,
        link,
        name,
        password
    };
    return msg;
}

export default { emailConfirmation, emailData };
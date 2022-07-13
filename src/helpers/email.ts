import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';



const emailConfirmation = async  (msg:Object)=>{
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY!
        })
    );
   await  transport.sendMail(msg)
}




const emailData = (from:String, to:string, subject:string,html:string) =>{
    const msg ={
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    return msg;
}

export default {emailConfirmation,emailData};
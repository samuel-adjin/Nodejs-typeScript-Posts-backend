import { Worker } from 'bullmq';
import bestEdit from "../helpers/award"
import mail from "../helpers/mail"
import constant from '../constant/constant';
import logger from 'loggers/logger';


// const worker = new Worker('baseQueue', async job => {
//   if (job.name === 'email') {
//     console.log(job.data)
//     console.log(job.data.email)
//     await mail.sendSignUpSuccessfulMail(job.data.name,job.data.to,job.data.link);
//   }
//   else if (job.name === 'award') {
//     await bestEdit()
//   } else {
//     return;
//   }
// });

const worker = new Worker(constant.JOBS.QUEUENAME,
async(job)=>{
  switch(job.name){
    case constant.JOBS.EMAILVERIFICATION:
      await mail.sendSignUpSuccessfulMail(job.data.name,job.data.to,job.data.link);
      break;
    case constant.JOBS.RESETLINK:
      await mail.sendPasswordResetMail(job.data.name,job.data.to,job.data.link);
      break;
    case constant.JOBS.ADMINCREATED:
      await mail.sendAdminCreatedMail(job.data.name,job.data.to,job.data.link,job.data.password);
      break;
    case constant.JOBS.AWARD:
      await bestEdit()
    default:
      break;
  }
}
)

export default worker;
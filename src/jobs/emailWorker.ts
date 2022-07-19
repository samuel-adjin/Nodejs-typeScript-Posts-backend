import { Worker } from 'bullmq';
import email from '../helpers/email';'../helpers/email';


const worker = new Worker('baseQueue', async job => {
  if (job.name === 'email') {
    await email.emailConfirmation(job.data);
  }
});

export default worker;
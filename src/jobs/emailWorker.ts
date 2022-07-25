import { Worker } from 'bullmq';
import email from '../helpers/email'; '../helpers/email';
import bestEdit from "../helpers/award"

const worker = new Worker('baseQueue', async job => {
  if (job.name === 'email') {
    await email.emailConfirmation(job.data);
  }
  else if (job.name === 'award') {
    await bestEdit()
  } else {
    return;
  }
});

export default worker;
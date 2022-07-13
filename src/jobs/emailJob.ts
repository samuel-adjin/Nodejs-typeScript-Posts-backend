import { Queue,Worker } from 'bullmq';
import email from '../helpers/email';'../helpers/email';


const emailQueue = new Queue('emailJob',{
    connection:{
        port:6379
    }
});


export default emailQueue;
import { Queue, QueueScheduler } from 'bullmq';
import constant from '../constant/constant';

const AppQueueScheduler = new QueueScheduler(constant.JOBS.QUEUENAME,
    {
        connection: {
            port: 6379
        }
    });

const baseQueue = new Queue(constant.JOBS.QUEUENAME, {
    connection: {
        port: 6379
    }
});


export default { baseQueue, AppQueueScheduler };
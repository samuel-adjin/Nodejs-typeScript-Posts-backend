import { Queue, QueueScheduler } from 'bullmq';

const AppQueueScheduler = new QueueScheduler("baseQueue",
    {
        connection: {
            port: 6379
        }
    });

const baseQueue = new Queue('baseQueue', {
    connection: {
        port: 6379
    }
});


export default { baseQueue, AppQueueScheduler };
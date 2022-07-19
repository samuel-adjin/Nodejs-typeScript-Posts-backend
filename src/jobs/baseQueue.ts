import { Queue } from 'bullmq';


const baseQueue = new Queue('baseQueue', {
    connection: {
        port: 6379
    }
});


export default baseQueue;
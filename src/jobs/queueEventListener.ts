import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('baseQueue');

queueEvents.on('completed', ({ jobId }) => {
    console.log(`job completed successfully ${jobId}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.error('error sending email', jobId, failedReason);
});

export default queueEvents;
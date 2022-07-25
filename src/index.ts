import server from "./server";
import config from './config/config'
import queue from "./jobs/baseQueue"



const start = async () => {
    await queue.baseQueue.add('award', {},{
        repeat: { cron: '*/10 * * * * *', limit: 1 }, 
        jobId: "award",
        attempts: 1,
      });
    server.listen(config.port, () => { console.log(`server is running on port ${config.port}`) });
}
start();
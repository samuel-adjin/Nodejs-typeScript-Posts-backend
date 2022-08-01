import server from "./server";
import config from './config/config'
import queue from "./jobs/baseQueue"
import logger from "./loggers/logger";
import constant from "./constant/constant";


const start = async () => {
    await queue.baseQueue.add(constant.JOBS.AWARD, {},{
        repeat: { cron: '*/10 * * * * *', limit: 1 }, 
        jobId: "award",
        attempts: 1,
      });
    server.listen(config.port, () => { logger.info(`server is running on port ${config.port}`) });
}
start();
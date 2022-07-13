import server from "./server";
import config from './config/config'

server.listen(config.port,()=>{console.log(`server is running on port ${config.port}`)});
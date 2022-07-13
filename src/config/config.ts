import dotenv from 'dotenv'


dotenv.config();
const port = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export default { port }
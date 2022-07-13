import express, { Application, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from 'dotenv';
import errorHandlerMiddleware from "./middleware/ErrorHandlerMiddleware";
import morganHttp  from "./middleware/morganMiddleware";
import errorHandler from "./errors/errorHandler"
import userRoute from "./routes/User"
import authRoute from "./routes/Auth"

dotenv.config();
const app: Application = express();
app.use(helmet())
app.use(morgan('combined'))
app.use(urlencoded({ extended: false }));
app.use(express.json())
app.use(errorHandlerMiddleware)
app.use(morganHttp)
// healthCheck
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json("Application health is good");
})

app.use('/v1/user',userRoute)
app.use('/v1/auth',authRoute)

process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
   });

   process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    throw reason;
   });
export default app;
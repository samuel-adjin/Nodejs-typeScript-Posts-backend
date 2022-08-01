import express, { Application, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from 'dotenv';
import morganHttp from "./middleware/morganMiddleware";
import userRoute from "./routes/User"
import authRoute from "./routes/Auth"
import postRoute from "./routes/Post"
import globalErrorHandler from "./middleware/global_error_handler"
import likesRoute from "./routes/Likes"
import commentRoute from "./routes/Comment"
import awardRoute from "./routes/award"
import cors from "cors"
import notFound from "./errors/ApiError404"


dotenv.config();
const app: Application = express();
app.use(express.json())
app.use(morganHttp)
app.use(helmet())
app.use(morgan('combined'))


// healthCheck
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json("Application health is good");
})

app.use('/v1/user', userRoute)
app.use('/v1/auth', authRoute)
app.use('/v1/post', postRoute)
app.use('/v1/likes', likesRoute)
app.use('/v1/comment', commentRoute)
app.use('/v1/award', awardRoute)
app.set('view engine', 'ejs');


app.use('*', () => {
  throw new notFound("No such route found");
});


app.use(cors({ methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'], optionsSuccessStatus: 200 }));
app.use(urlencoded({ extended: false }));

app.use(globalErrorHandler)

export default app;
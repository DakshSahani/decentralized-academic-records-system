import express from "express"
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from "./middlewares/errorHandler.js"

import { BAD_REQUEST } from "./errors/index.js"


const app = express();

//------------------------------------------------
// MIDDLEWARES 
//------------------------------------------------

app.use(express.json())
app.use(cors())
app.use(cookieParser())
//Secure Header
app.use(helmet());
//Mongo db sanitization
app.use(mongoSanitize())
//xss-clean
app.use(xssClean())

//Limit the number of requests from 1 IP address
const limiter = rateLimit({
    max:1000,    //Max numbers of request can be made by same IP
    windowMs: 1000*60*60, //time period (in ms) for limiting the request
    message:"Too much request from this IP please try again later"
})
app.use('/api',limiter)


//------------------------------------------------
// ROUTES
//------------------------------------------------

import authRouter from "./routes/authRoutes.js"


app.use("/auth", authRouter);

app.all('*',(req, res, next)=>{
    return next(new BAD_REQUEST("This route is not defined"))
})
app.use(errorHandlerMiddleware)



export default app
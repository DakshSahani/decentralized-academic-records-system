import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next)=>{
    const defaultErr = {
        statusCode: err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err?.message || "Something went wrong. Please try again later!"
    }
    const isDev = (process.env.NODE_ENV === 'development')
    
    if(err.name === "ValidationError") {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.values(err.errors).map((item)=>item.message).join(", ");
    }
    if(err.code && err.code === 11000) {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        // defaultErr.message = Object.keys(err.keyValue).join(", ") + " has to be unique.";
        defaultErr.message = "Validation Error";
    }
    if(isDev){
        defaultErr.stack = err.stack
        defaultErr.error = err;
        console.log(err)
    }
    
    res.status(defaultErr.statusCode).json({status:"fail",message: defaultErr.message});
}

export default errorHandlerMiddleware
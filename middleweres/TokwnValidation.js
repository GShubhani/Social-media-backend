import asynhandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const tokenValidation = asynhandler(async (request,response,next)=>{
   console.log("hii");
    let token ;
    let authheader = request.headers.authorization || request.headers.Authorization;
    if(authheader && authheader.startsWith("Bearer" || "bearer" )){
        token = authheader.split(" ")[1]
        console.log(authheader,"77");
        console.log(token,"7");
        jwt.verify(token,process.env.SECERT_KEY,(err,decode)=>{
            if(err){
                response.status(401);
            return next(new Error("User is not authorized")); 
            }
            request.user = decode.user;
            console.log( request.user," request.user234");
          next(); 
        })
    }else {
        response.status(401);
        return next(new Error("User is not authorized or token is missing")); // Pass the error to the error handler middleware
      }
   

})
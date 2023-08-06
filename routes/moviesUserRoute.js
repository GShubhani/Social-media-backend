import express from "express" 
import {AllUserRegistration,AllUserlogin} from "../controlers/moviesUserControler.js"

export const AllUser = express.Router()

AllUser.get("/test",(req,res)=>{
    res.json({data:"data send "})
})

AllUser.post("/register",AllUserRegistration)
AllUser.post("/login",AllUserlogin)
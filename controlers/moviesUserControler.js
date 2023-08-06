import express, { response } from "express";
import asyncHandler from "express-async-handler"
import AllUser from "../models/moviesUserModel.js"
// import EmailOtp from "../models/EmailOTP.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const AllUserRegistration = asyncHandler(async (request, response) => {

    try {
        const {
            type,
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            gender,
            country,
            profilepic,
            device
        } = request.body;
        if (!type || !firstName || !lastName || !email || !password || !country ||
            !mobileNumber || !gender || !device) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const checkemail = await AllUser.find({ email })
                if (checkemail.length !== 0) {
                    return response.status(400).json({ message: "email already exist" })
                }
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
               
                const User = await AllUser.create({ type,
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    mobileNumber,
                    gender,
                    country,
                    profilepic,
                    device})
                return response.json({ message: "successfull", data: User })
                // return response.json({ message: "successfull", data: "User" })
            } catch (err) {
                console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "user found but problem to save" });
            }

        }
        // return response.json({ message: "successfull", data: "User" })
    } catch (err) {
        console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "Something went wrong on the server" });
    }
})

export const AllUserlogin = asyncHandler(async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;
        const device = request.body.device;
        if (!email || !password || !device) {
            return response.status(400).json({ data: "Some fields are missing" });
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return response.status(401).json({ message: "Invalid password" });
                }
                user.device = device;
                await user.save()
                const token = jwt.sign({ user }, process.env.SECERT_KEY);
                const userDetails = { ...user.toObject(), password: undefined, amount: undefined };
                return response.json({ message: "Login successful", user: userDetails, accessToken:token });
            } catch (err) {
                console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "user found but problem in login code" });
            }
        }
    } catch (err) {
        console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "Something went wrong on the server" });
    }
});

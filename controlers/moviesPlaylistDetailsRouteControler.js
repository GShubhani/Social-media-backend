import express, { response } from "express";
import asyncHandler from "express-async-handler"
import MoviesPlaylist from "../models/moviesPlaylistDetailsModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const CreatePlaylist = asyncHandler(async (request, response) => {

    try {
        const {
            email,
            playlistName,
            playlistType,
            playlistData
        } = request.body;


        if (!playlistName || !playlistType || !playlistData || !email ) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {


            try {
                const checkemail = await MoviesPlaylist.find({ email })
                if (checkemail.length !== 0) {
                    return response.status(400).json({ message: "email already exist" })
                }
                console.log(request.user,"2345");
               
                const newAllUser = new MoviesPlaylist({
                    userId:request.user._id,
                    email,
                    playlistName,
                    playlistType,
                    playlistData
                });
                const User = await MoviesPlaylist.create(newAllUser)
                return response.json({ message: "successfull", data: User })
                // return response.json({ message: "successfull", data: "User" })
            } catch (err) {
                console.log("error in regidtration ", err);
                throw new Error("backend problem ")
            }
        }
    } catch (err) {
        throw new Error("backend problem ",err)
    }
})
export const getPlaylist = asyncHandler(async (request, response) => {

    try {
       const allPlaylist = await MoviesPlaylist.find({ userId: request.user._id })
       response.json({allPlaylist})
    } catch (err) {
        throw new Error("backend problem ",err)
    }
})
export const getAllPlaylist = asyncHandler(async (request, response) => {

    try {
       const allPlaylist = await MoviesPlaylist.find({playlistType:"public"})
       response.json({allPlaylist})
    } catch (err) {
        throw new Error("backend problem ",err)
    }
})
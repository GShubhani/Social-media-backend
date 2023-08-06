import express, { response } from "express";
import asyncHandler from "express-async-handler"
import MoviesPlaylist from "../models/moviesPlaylistDetailsModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const CreatePlaylist = asyncHandler(async (request, response) => {
  console.log("opo");
    try {
      const { email, playlistName, playlistType, playlistData } = request.body;
  
      if (!playlistName || !playlistType || !playlistData || !email) {
        return response.status(400).json({ message: "Some fields are missing" });
      } else {
        const checkEmail = await MoviesPlaylist.find({ email });
        if (checkEmail.length !== 0) {
          return response.status(400).json({ message: "Email already exists" });
        }
  
        console.log(request.user, "2345");
  
      
  
        const newUser = await MoviesPlaylist.create({ userId: request.user._id,
          email,
          playlistName,
          playlistType,
          playlistData,});
  
        return response.json({ message: "Successfully created a new playlist", data: newUser });
      }
    } catch (err) {
      console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "Something went wrong on the server" });
    }
  });
export const getPlaylist = asyncHandler(async (request, response) => {

    try {
       const allPlaylist = await MoviesPlaylist.find({ userId: request.user._id }).populate("playlistData.movieslistId")
       response.json({allPlaylist})
    } catch (err) {
        console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "Something went wrong on the server" });
    }
})
export const getAllPlaylist = asyncHandler(async (request, response) => {

    try {
       const allPlaylist = await MoviesPlaylist.find({playlistType:"public"}).populate("playlistData.movieslistId")
       response.json({allPlaylist})
    } catch (err) {
        console.log("Error in playlist creation:", err);
        return response.status(500).json({ message: "Something went wrong on the server" });
    }
})
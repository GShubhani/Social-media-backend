import express from "express"
import asyncHandler from "express-async-handler"
import AllMoviesList from "../models/MoviesList.js"

export const MoviesListRouter = express.Router()

MoviesListRouter.post("/createList1",asyncHandler(async(request,response)=>{
    
    try {
        const {
            movieTitle,
            movieYear,
            movieImage
        } = request.body;


        if (!movieTitle || !movieYear || !movieImage ) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
              
                // Create a new seller admin instance
                const newAllUser = new AllMoviesList({
                    movieTitle,
                    movieYear,
                    movieImage
                });
                const User = await AllMoviesList.create(newAllUser)
                return response.json({ message: "successfull", data: User })
                // return response.json({ message: "successfull", data: "User" })
            } catch (err) {
                console.log("error in regidtration ", err);
                throw new Error("backend problem ")
            }

        }
        // return response.json({ message: "successfull", data: "User" })
    } catch (err) {
        throw new Error("backend problem ",err)
    }
}))
MoviesListRouter.get("/getList1",asyncHandler(async(request,response)=>{
    try{
        const getAllMovies = await AllMoviesList.find()
        response.json(getAllMovies)
    }catch(err){
        console.log(err);
    }
}))
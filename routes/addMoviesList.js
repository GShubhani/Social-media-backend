import express from "express"
import asyncHandler from "express-async-handler"
import AllMoviesList from "../models/MoviesList.js"

export const MoviesListRouter = express.Router()

MoviesListRouter.post("/createList1",asyncHandler(async(request,response)=>{
    console.log("createlist -----------");
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
              
              
                const User = await AllMoviesList.create({
                    movieTitle,
                    movieYear,
                    movieImage
                })
                if(User){

                    return response.json({ message: "successfull", data: User })
                }else{

                    return response.json({ message: "sorry", data: "not save" })
                }
            } catch (err) {
                console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "some proble in code" });
            }

        }
        // return response.json({ message: "successfull", data: "User" })
    } catch (err) {
        console.log("Error in playlist creation:", err);
        return response.status(500).json({ message: "Something went wrong on the server" });
    }
}))
// export const AllUserlogin = asyncHandler(async (request, response) => {
//     try {
//         const movieTitle = request.body.movieTitle;
//         const movieYear = request.body.movieYear;
//         const movieImage = request.body.movieImage;
//         if (!movieTitle || !movieYear || !movieTitle) {
//             return response.status(400).json({ data: "Some fields are missing" });
//         } else {
//             try {
//                 const user = await AllUser.findOne({ email });
//                 if (!user) {
//                     return response.status(404).json({ message: "User not found" });
//                 }
//                 const passwordMatch = await bcrypt.compare(password, user.password);
//                 if (!passwordMatch) {
//                     return response.status(401).json({ message: "Invalid password" });
//                 }
//                 user.device = device;
//                 await user.save()
//                 const token = jwt.sign({ user }, process.env.SECERT_KEY);
//                 const userDetails = { ...user.toObject(), password: undefined, amount: undefined };
//                 return response.json({ message: "Login successful", user: userDetails, accessToken:token });
//             } catch (err) {
//                 console.log("Error in playlist creation:", err);
//       return response.status(500).json({ message: "user found but problem in login code" });
//             }
//         }
//     } catch (err) {
//         console.log("Error in playlist creation:", err);
//       return response.status(500).json({ message: "Something went wrong on the server" });
//     }
// });

MoviesListRouter.get("/getList1",asyncHandler(async(request,response)=>{
    try{
        const getAllMovies = await AllMoviesList.find()
        response.json(getAllMovies)
    }catch(err){
        console.log("Error in playlist creation:", err);
      return response.status(500).json({ message: "Something went wrong on the server" });
    }
}))
import express from "express" 
import { tokenValidation } from "../middleweres/TokwnValidation.js"
import {CreatePlaylist,getPlaylist,getAllPlaylist} from "../controlers/moviesPlaylistDetailsRouteControler.js"

export const MoviesPlayListRouter = express.Router()

MoviesPlayListRouter.post("/createPlaylist",tokenValidation,CreatePlaylist )
MoviesPlayListRouter.get("/getplaylist",tokenValidation,getPlaylist )
MoviesPlayListRouter.get("/getallplaylist",tokenValidation,getAllPlaylist )
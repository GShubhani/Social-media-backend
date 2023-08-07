import express from "express" 
import { tokenValidation } from "../middleweres/TokwnValidation.js"
import {CreatePlaylist,getPlaylist,getAllPlaylist,getAllPlaylistPublic,getAllPlaylistPrivate} from "../controlers/moviesPlaylistDetailsRouteControler.js"

export const MoviesPlayListRouter = express.Router()

MoviesPlayListRouter.post("/createPlaylist",tokenValidation,CreatePlaylist )
MoviesPlayListRouter.get("/getplaylist",tokenValidation,getPlaylist )
MoviesPlayListRouter.get("/getallplaylist",tokenValidation,getAllPlaylist )
MoviesPlayListRouter.get("/getallpublicplaylist",tokenValidation,getAllPlaylistPublic )
MoviesPlayListRouter.get("/getallprivateplaylist",tokenValidation,getAllPlaylistPrivate )
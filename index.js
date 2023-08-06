import express from "express";
import dotenv from "dotenv"
dotenv.config()
// import { errorHandler } from "./middleweres/Errorhandler";
import cors from "cors";
import {connectDB} from "./config/Database.js"
import {AllUser} from "./routes/moviesUserRoute.js"
import {MoviesPlayListRouter} from "./routes/moviesPlaylistDetailsRoute.js"
import {MoviesListRouter} from "./routes/addMoviesList.js"


const port = process.env.PORT || 5005

const app = express()

connectDB()

// Advanced CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ["https://moviesplaylist2-3n59.vercel.app", "http://localhost"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  
  app.use(cors(corsOptions));
// app.use(cors())
app.use(express.json())
app.use("/user", AllUser);
app.use("/playlist", MoviesPlayListRouter);
app.use("/add", MoviesListRouter);

// app.use(errorHandler)

app.listen(port,()=>{
    console.log(`connect on port ${port}`);
})
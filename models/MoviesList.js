import mongoose from "mongoose";

const movieslistSchema = mongoose.Schema({
    movieTitle:{
        type: String,
        required: true,
        unique: [true, "Name already taken"],
    },
    movieYear:{
        type: Date,
        required: true,
    },
    movieImage:{
        type: String,
        required: false,
    },
  },{
    timestamp:true
  })

  
const AllMoviesList = mongoose.model("AllMoviesList", movieslistSchema);

export default AllMoviesList;
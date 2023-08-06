import mongoose from "mongoose";

const moviesDetails = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "AllMoviesUser",
    },
    playlistName: {
      type: String,
      required: true,
    },
    playlistType: {
      type: String,
      required: true,
      enum: ["public", "private"],
    },
    playlistData: [
      {
        movieslistId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "AllMoviesList",
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const MoviesPlaylist = mongoose.model("MoviesPlaylist", moviesDetails);

export default MoviesPlaylist;


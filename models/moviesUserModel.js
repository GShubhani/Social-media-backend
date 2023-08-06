import mongoose from "mongoose";

const AllUserSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  firstName: {
    type: String,
    minLength: [1, "Please enter at least 1 characters"],
    required: [true, "Please enter your name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email address already taken"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [4, "Please enter at least 4 characters"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please enter your mobile number"],
    minLength: [9, "Mobile number should not be less than 9 characters"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  country: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  device: {
    fcmToken: {
      type: String,
      required: true,
    },

    deviceCountryData: {
      type: Array,
      required: true,
    },

    deviceIdentifier: {
      type: Array,
      required: true,
    },
  },
  address: [
    {
      village: {
        type: String,
      },
      District: {
        type: String,
      },
      state: {
        type: String,
      },
      PinCode: {
        type: Number,
      },
      nationality: {
        type: String,
      },
    },
  ],
},
{
  timestamps: true,
});

const AllMoviesUser = mongoose.model("AllMoviesUser", AllUserSchema);

export default AllMoviesUser;

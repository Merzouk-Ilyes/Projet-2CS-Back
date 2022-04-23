const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim:true,
      required: true,
      unique:true,
    },
    idUser: {
      type: Number,
      required: true
    },
    verified: {
      type: Boolean,
      trim:true,
      required: true,
      default:false
    },
    city: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    nbrBeds: {
      type: Number,
    },
    nbrBathes: {
      type: Number,
    },
    space: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    PricePerNight: {
      type: Number ,
      required: true,
    },
    RatingTotal: {
      type: Number,
      required:true,
      default:0
    },
    furnish: {
      type: Boolean,
      required:true,
      default:false
    },
    gas:{
        type: Boolean,
        required:true,
      default:false
      },
    water: {
        type: Boolean,
        required:true,
      default:false

      },
    electricity: {
        type: Boolean,
        required:true,
      default:false
      },
    image: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/9-93879_computer-icons-user-image-person-silhouette-user-silhouettes.png",
    },
    salt: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);

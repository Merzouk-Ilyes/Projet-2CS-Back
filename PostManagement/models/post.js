const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: Number,
      required: true,
      default: 0,
    },
    idUser:{
      type:Number,
      required:true
    },
    verified: {
      type: Boolean,
      trim: true,
      required: true,
      default: false,
    },
    rating:[
      {
        ratingValue: { type: Number ,required: true},
        clientId: { type:mongoose.Schema.Types.ObjectId},
      },
    ],
    comment:[
      {
        commentValue: { type: String },
        clientId: {type:mongoose.Schema.Types.ObjectId},
      },
    ],
    signal:[
      {
        etat: {type: String ,required: true,default:"waiting"},//etate["waiting","solved"]
        date: { type: Date ,required: true,default:new Date()},
        description: { type: String },
        reson: { type: String ,required: true},
        clientId: { type:mongoose.Schema.Types.ObjectId},
      },
    ],
    RatingTotal: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    street: {
      type: String,
      trim: true,
      required: true,
    },
    nbrBeds: {
      type: Number,
      required: true,
    },
    nbrBathes: {
      type: Number,
      required: true,
    },
    space: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    PricePerNight: {
      type: Number,
      required: true,
    },
    RatingTotal: {
      type: Number,
      default: 0,
    },
    furnish: {
      type: Boolean,
      default: false,
    },
    gas: {
      type: Boolean,
      default: false,
    },
    water: {
      type: Boolean,
      required: true,
      default: false,
    },
    electricity: {
      type: Boolean,
      required: true,
      default: false,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    salt: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);

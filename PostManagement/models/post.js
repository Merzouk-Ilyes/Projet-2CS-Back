const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    idUser: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      trim: true,
      required: true,
      default: false,
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
      required: true,
      default: 0,
    },
    furnish: {
      type: Boolean,
      required: true,
      default: false,
    },
    gas: {
      type: Boolean,
      required: true,
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
    image: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);

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
      default: 1,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    nameUser: {
      type: String,
      required: true,
    },
    imageUser: {
      type: String,
      required: true,
    },

    // not verefied 0  ---- verefied 1 ----- declined 2

    verified: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },

    declineReason: {
      type: String,
    },
    rating: [
      {
        ratingValue: { type: Number, default: 0 },
        clientId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    comment: [
      {
        commentValue: { type: String },
        clientId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    signal: [
      {
        etat: { type: String, default: "waiting" }, //etate["waiting","solved"]
        date: { type: Date, default: new Date() },
        description: { type: String },
        reson: { type: String },
        clientId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    feedBack: [
      {
        agent: { type: mongoose.Schema.Types.ObjectId },
        description: { type: String },
        validation: { type: Boolean },
        date_with_host: { type: Date },
      },
    ],

    RatingTotal: {
      type: Number,
      default: 0,
    },

    available: {
      type: Boolean,
      default: true,
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
    },
    nbrBathes: {
      type: Number,
    },
    space: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    PricePerNight: {
      type: Number,
      required: true,
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

      default: false,
    },
    electricity: {
      type: Boolean,

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

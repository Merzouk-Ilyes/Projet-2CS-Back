const mongoose = require('mongoose')
const User = require('../models/user')
const reservationSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0, //0=WAITING
    },
    people: [
      {
        age: { type: Number },
        sexe: { type: Number },
      },
    ],
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    id_post: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Reservation', reservationSchema)

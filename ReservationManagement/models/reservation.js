const mongoose = require("mongoose");
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
        default:0//0=WAITING 
      },
      people:[
        {
          age: { type: Number },
          sexe: {type:Number},
        },
      ],
},
{ timestamps: true }
);
module.exports = mongoose.model("Reservation",  reservationSchema);
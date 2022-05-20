const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    id_host: mongoose.Schema.Types.ObjectId ,
    type:{ type:Number},
    discreption:{ type:String},
},
{ timestamps: true }
);
module.exports = mongoose.model("Notification", notificationSchema );
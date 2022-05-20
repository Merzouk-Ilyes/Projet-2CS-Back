const Notification = require("../../AccountManagement/models/notification");

exports.addnotification = async (req, res) => {
    const notification = new Notification(req.body);
    await notification.save((err,notification) => {
      if (err) {
         res.json(err);
      } else {
         res.json(notification);
      }
    });
  };



exports.getNotificationByidHost = async (req , res) =>{
   const idHost = req.body.id ;
   Notification.find({id_host:idHost})
   .then((result)=>{
       res.json({result})
   })
   .catch((err)=>{
       res.send(err);
   })
}
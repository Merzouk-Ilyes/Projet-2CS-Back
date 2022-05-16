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
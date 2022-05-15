const Reservation = require("../models/reservation");
/* the host only can use this method when he is validated*/
exports.addreservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save((err, post) => {
    if (err) {
       res.json(err);
    } else {
       res.json(post);
    }
  });
};
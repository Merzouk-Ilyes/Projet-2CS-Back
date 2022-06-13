const User = require('../models/User')

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (!user || err) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "u do not have the permission",
        });
      }

      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};



exports.getAgents = (req, res) => {
  
  User.find({role:1}).then((users) => {
    res.json(users);

  }).catch(err => {
    console.error(err);
  })
}

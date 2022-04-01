const User = require("../models/User"); 

exports.getAllAccounts = (req, res) => {
  User.find({}, function (err, docs) {
    res.json({ docs }); 
  });
}; 

exports.validateEmail = async (req, res) => {
  const id = req.body.id;
  await User.updateOne({ _id: id }, { emailVerified: true });

  res.json({
    message: "Email is verified",
  });
};

exports.validateAccount = async (req, res) => {
  const id = req.body.id;
  await User.updateOne({ _id: id }, { accountVerified: true });

  res.json({
    message: "Account is validated",
  });
};

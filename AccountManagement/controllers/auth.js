const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(errorHandler(err))
    }
    res.json({
      user,
    })
  })
}

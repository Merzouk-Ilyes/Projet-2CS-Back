const User = require('../models/User')

exports.userById = (req, res, next) => {
  let { id } = req.params
  User.findById(id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.userById2 = (req, res, next) => {
  let { id } = req.params
  User.findById(id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined

  return res.json(req.profile)
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'u do not have the permission',
        })
      }

      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    }
  )
}

exports.getAgents = (req, res) => {
  User.find({ role: 1 })
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err)
    })
}

exports.addFavourite = (req, res) => {
  let { userId } = req.query
  let { postId } = req.query
  console.log(postId)
  User.findOneAndUpdate(
    { _id: userId },
    {
      //  using push to add a new value without losing the old one
      $push: {
        favourit: {
          postId,
        },
      },
    }
  )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

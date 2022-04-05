const { query } = require('express')
const { token } = require('morgan')
const User = require('../models/User')

exports.getAllAccounts = (req, res) => {
  User.find({}, function (err, docs) {
    res.json({ docs })
  })
}

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

exports.validateEmail = async (req, res) => {
  try {
    const token = req.query.token
    const user = await User.findById(token)
    if (user) {
      user.emailVerified = true
      await user.save()
      res.redirect('http://localhost:3000/login')
    } else {
      console.log('error number 1')
    }
  } catch (e) {
    console.log(e)
  }
}

exports.validateAccount = async (req, res) => {
  const id = req.body.id
  await User.updateOne({ _id: id }, { accountVerified: true })

  res.json({
    message: 'Account is validated',
  })
}

const { query } = require('express')
const { token } = require('morgan')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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

exports.forgetPassword = async (req, res) => {
  const { email } = req.body
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.json({
        err: 'This user does not exist',
      })
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
      },
    })

    try {
      const secret = process.env.JWT_SECRET + user.password
      const payload = {
        email: user.email,
        id: user.id,
      }

      const token = jwt.sign(payload, secret, { expiresIn: '30m' })
      const url = `http://localhost:8000/resetpass/${user.id}/${token}`

      var mailOptions = {
        from: 'AirbnbLight@airbnb.com',
        to: user.email,
        subject: 'Reset password',
        html: `visit this link to update your password: <a href="${url}">${url}</a>`,
      }

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('email sent', user.email, user._id)
        }
      })
    } catch (e) {
      console.log(e)
    }

    return res.json({
      message: 'check your email',
    })
  })
}

exports.getresetpass = async (req, res, next) => {
  const { id, token } = req.params

  const user = await User.findById(id)

  const secret = process.env.JWT_SECRET + user.password

  try {
    const payload = jwt.verify(token, secret)
    res.redirect(`http://localhost:3000/reset/?id=${id}&token=${token}`)
  } catch (err) {
    return res.json({
      err: err,
    })
  }
}

exports.postresetpass = async (req, res, next) => {
  const { id, token } = req.params
  const { password } = req.body

  const user = await User.findById(id)

  const secret = process.env.JWT_SECRET + user.password

  try {
    const payload = jwt.verify(token, secret)
    user.password = password
    user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        })
      }
      return res.json({
        message: 'password updated ',
      })
    })
  } catch (err) {
    return res.json({
      err: err,
    })
  }
}

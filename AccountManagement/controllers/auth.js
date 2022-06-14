const User = require('../models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const _ = require('lodash')
require('dotenv').config()

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

exports.signup = async (req, res) => {
  const user = new User(req.body)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'medzino85@gmail.com',
      accessToken:
        'ya29.a0ARrdaM-X2ct4YpkZ5hdLLhZ3sfJnPfDPkT4IglGSJTBnOlwFaxVMwa1ad70UORjI95zJfR1kbMLuzNTBRwXgSKnw4gTXpwUrSLiuw4nk7LUK91ltASo5dn_jYWPcGJO5-UxrKfyhBFdayLk5j9epHFWSFIJo',
    },
  })

  try {
    const emailToken = jwt.sign(
      {
        user: _.pick(user, 'id'),
      },
      EMAIL_SECRET,
      {
        expiresIn: '1d',
      }
    )

    const url = `http://localhost:8000/confirmation?token=${user._id}`

    var mailOptions = {
      from: 'AirbnbLight@airbnb.com',
      to: user.email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
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
  await user.save((err, user) => {
    if (err) {
      return res.json(err)
    }

    res.json({
      user,
    })
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({
        err: 'This user does not exist',
      })
    }
    if (!user.authenticate(password)) {
      return res.json({
        err: 'Wrong password',
      })
    }
    if (user.emailVerified) {
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET)
      res.cookie('token', token, { expire: new Date() + 9999 })
      return res.json({ token, user: { user } })
    }
    return res.json({
      err: 'Email is not verified',
    })
  })
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ messagr: 'logout secceeded' })
}

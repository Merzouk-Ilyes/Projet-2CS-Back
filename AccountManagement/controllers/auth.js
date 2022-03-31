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

// exports.signin = (req, res) => {
//     // find the user with that email
//     const {email, password} = req.body
//     User.findOne({email}, (err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 err: 'user with this email does not exist',
//             })
//         }
//         // if user find make sure password match

//         //create authenticate method in user model
//         if (!user.authenticate(password)) {
//             return res.status(400).json({
//                 err: 'user with this email does not exist',
//             })
//         }

//         //generate a signed token with with user id and tokken
//         const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET)
//         res.cookie('t', token, {expire: new Date() + 9999})
//         const {_id, name, email, role} = user
//         return res.json({token, user: {_id, email, name, role}})
//     })
// }

// exports.signout = (req, res) => {
//     res.clearCookie('t')
//     res.json({message: 'logout secceeded'})
// }

// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     userProperty: 'auth',
// })

// exports.isAuth = (req, res, next) => {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id
//     if (!user) {
//         return res.status(403).json({
//             error: 'access denied',
//         })
//     }
//     next()
// }

// exports.isAdmin = (req, res, next) => {
//     if (req.profile.role == 0) {
//         return res.status(403).json({
//             error: 'admin playground kiddo',
//         })
//     }
//     next()
// }

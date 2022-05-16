const express = require('express')
const router = express.Router()
const { signup, login, logout } = require('../controllers/auth')

const {addnotification} = require('../../AccountManagement/controllers/notification')

router.post('/addnotification',addnotification)
const {
  validateEmail,
  forgetPassword,
  getresetpass,
  postresetpass,
} = require('../controllers/admin')

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgetpass', forgetPassword)
router.get('/confirmation', validateEmail)
router.get('/logout', logout)
router.get('/resetpass/:id/:token', getresetpass)
router.post('/resetpass/:id/:token', postresetpass)

module.exports = router

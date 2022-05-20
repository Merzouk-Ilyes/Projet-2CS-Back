const express = require('express')
const router = express.Router()
const { signup, login, logout } = require('../controllers/auth')

const {addnotification , getNotificationByidHost} = require('../../AccountManagement/controllers/notification')
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


router.post('/addnotification',addnotification)
router.post('/getNotificationByidHost',getNotificationByidHost)

module.exports = router

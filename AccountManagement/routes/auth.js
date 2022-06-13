const express = require('express')
const router = express.Router()
const { signup, login, logout } = require('../controllers/auth')

<<<<<<< HEAD
const {
  getNotificationByidHost,
} = require('../../AccountManagement/controllers/notification')
const { addnotification, test } = require('../controllers/notification')
router.post('/addnotification', addnotification)
router.get('/test', test)
=======
const {getNotificationByidHost} = require('../../AccountManagement/controllers/notification')
const {addnotification,test} = require('../controllers/notification')
>>>>>>> bf28a177205752b537a53c4dada693838fc1ab37

const {
  validateEmail,
  forgetPassword,
  getresetpass,
  postresetpass,
<<<<<<< HEAD
} = require('../controllers/admin')
=======
} = require('../controllers/admin') 


router.post('/addnotification',addnotification)
router.get('/test',test)


router.get('/test',test)
>>>>>>> bf28a177205752b537a53c4dada693838fc1ab37

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgetpass', forgetPassword)
router.get('/confirmation', validateEmail)
router.get('/logout', logout)
router.get('/resetpass/:id/:token', getresetpass)
router.post('/resetpass/:id/:token', postresetpass) 

<<<<<<< HEAD
router.post('/addnotification', addnotification)
router.post('/getNotificationByidHost', getNotificationByidHost)
=======
// router.post('/addnotification',addnotification)
router.post('/getNotificationByidHost',getNotificationByidHost)
>>>>>>> bf28a177205752b537a53c4dada693838fc1ab37

module.exports = router

const express = require('express')
const router = express.Router()
const { signup, login, logout } = require('../controllers/auth')
const { validateEmail } = require('../controllers/admin')

router.post('/signup', signup)
router.post('/login', login)
router.get('/confirmation', validateEmail)
// router.post("/validateAccount", validateAccount);

// router.param('userId', userById)
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router

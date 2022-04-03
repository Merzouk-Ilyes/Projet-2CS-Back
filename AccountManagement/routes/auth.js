const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/auth')
const {
  getAllAccounts,
  validateEmail,
  validateAccount,
} = require('../controllers/admin')

router.post('/signup', signup)
router.post('/login', login)
router.get('/accounts', getAllAccounts) /
  router.get('/confirmation', validateEmail)
// router.post("/validateAccount", validateAccount);

// router.param('userId', userById)

module.exports = router

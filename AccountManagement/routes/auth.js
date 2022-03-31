const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

const { signup } = require('../controllers/auth')

router.post('/signup', signup)

module.exports = router

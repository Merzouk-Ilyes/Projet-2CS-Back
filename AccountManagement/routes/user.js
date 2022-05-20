const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')

router.post('/userById', userById)

module.exports = router

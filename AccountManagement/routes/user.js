const express = require('express')
const router = express.Router()
const { userById,getAgents } = require('../controllers/user')

router.post('/userById', userById)
router.get('/getAgents',getAgents)

module.exports = router

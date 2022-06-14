const express = require('express')
const router = express.Router()
const { userById, getAgents, addFavourite } = require('../controllers/user')

router.post('/userById', userById)
router.post('/addfav', addFavourite)

router.get('/getAgents', getAgents)

module.exports = router

const express = require('express')
const router = express.Router()
const {addreservation} = require('../controllers/reservation')
router.post('/addreservation',addreservation)
module.exports = router

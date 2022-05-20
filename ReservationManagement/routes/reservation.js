const express = require('express')
const router = express.Router()
const {addreservation,UserReserved,PostHasReservations,deletereservation} = require('../controllers/reservation')
router.post('/addreservation',addreservation)
router.post('/deletereservation',deletereservation)
router.get('/userreserved',UserReserved)
router.get('/PostHasReservations',PostHasReservations)

module.exports = router

const express = require('express')
const Notification = require('../../AccountManagement/models/notification')

const router = express.Router()
const {
  addreservation,
  UserReserved,
  PostHasReservations,
  deletereservation,
  getReservationByIdHost,
  ChangeReservationStatus,
} = require('../controllers/reservation')
router.post('/addreservation', addreservation)
router.post('/deletereservation', deletereservation)
router.get('/userreserved', UserReserved)
router.get('/PostHasReservations', PostHasReservations)
router.get('/getReservationByIdHost', getReservationByIdHost)

router.post('/ChangeReservationStatus', ChangeReservationStatus)
module.exports = router

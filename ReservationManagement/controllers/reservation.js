const Reservation = require('../models/reservation')
// const fetch = require('node-fetch')
// const Notification = require('../../AccountManagement/models/notification')

//add reservation with a notification type 0
exports.addreservation = async (req, res) => {
  var iduser = req.query.user
  const datedb = req.body.startDate
  const datefn = req.body.endDate
  const people = req.body.people
  const nom_user = req.body.nom_user
  const id_host = req.body.id_host
  var post = req.body.id_post
  var amount = req.body.amount
  console.log(iduser)
  const reservation = new Reservation({
    startDate: datedb,
    endDate: datefn,
    people: people,
    id_user: iduser,
    id_post: post,
    nom_user: nom_user,
    id_host: id_host,
    amount: amount,
  })
  reservation
    .save()
    .then((result) => {
      console.log('it happend')
      res.json(result)
    })
    .catch((err) => {
      res.send(err)
    })
}

//delete reservation
exports.deletereservation = async (req, res) => {
  const idreservation = req.query.reservation
  Reservation.deleteOne({ _id: idreservation })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.send(err)
    })
}
//this method tell us if the user has been reserved in this post before
exports.UserReserved = async (req, res) => {
  console.log('m in')
  const iduser = req.query.iduser
  const idpost = req.query.idpost
  Reservation.find({ id_post: idpost, id_user: iduser })
    .then((result) => {
      if (Object.keys(result).length > 0) {
        res.json({ reserved: true })
      } else {
        res.json({ reserved: false })
      }
    })
    .catch((err) => {
      res.send(err)
    })
}

//this method tell us if the user has been reserved in this post before
exports.PostHasReservations = async (req, res) => {
  const idpost = req.query.idpost
  Reservation.find({ id_post: idpost })
    .then((result) => {
      if (Object.keys(result).length > 0) {
        res.json({ HasReservations: true, result })
      } else {
        res.json({ HasReservations: false, result })
      }
    })
    .catch((err) => {
      res.send(err)
    })
}

// get reservation by id host
exports.getReservationByIdHost = async (req, res) => {
  const idHost = req.params.id
  Reservation.find({ id_user: idHost })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

//change reservation status
exports.ChangeReservationStatus = async (req, res) => {
  const status = req.body.status
  const idRes = req.body.idReservation

  const reservation = Reservation.findById(idRes)

  Reservation.updateOne(reservation, { status: status })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

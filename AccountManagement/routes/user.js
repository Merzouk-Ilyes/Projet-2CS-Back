const express = require('express')
const router = express.Router()
const {
  userById,
  getAgents,
  addFavourite,
  userById2,
} = require('../controllers/user')

router.post('/userById/:id', userById)
router.post('/userById2/:id', userById2)

router.post('/addfav', addFavourite)

router.get('/getAgents', getAgents)

module.exports = router

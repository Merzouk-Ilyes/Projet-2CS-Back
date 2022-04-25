const express = require('express')
const router = express.Router()
const {addpost,findAllPosts} = require('../controllers/post')

router.post('/addpost', addpost)
router.get('/findAllPosts',findAllPosts)


module.exports = router

const express = require('express')
const router = express.Router()
const {addpost,findAllPosts,findPostById,UpdatePostById} = require('../controllers/post')
const {addrating} = require('../controllers/rating')


router.put('/addrating',addrating)
router.post('/addpost', addpost)
router.get('/findAllPosts',findAllPosts)
router.get('/findPostById/:id',findPostById)
router.patch('/UpdatePostById/:id',UpdatePostById)

module.exports = router

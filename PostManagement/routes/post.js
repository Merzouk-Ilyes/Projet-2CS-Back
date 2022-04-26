const express = require('express')
const router = express.Router()
const {addpost,findAllPosts,findPostById,UpdatePostById} = require('../controllers/post')

router.post('/addpost', addpost)
router.get('/findAllPosts',findAllPosts)
router.get('/findPostById/:id',findPostById)
router.patch('/UpdatePostById/:id',UpdatePostById)
module.exports = router

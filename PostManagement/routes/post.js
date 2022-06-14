const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()
const raccoon = require('raccoon')
const Post = require('../models/post')

raccoon.config.nearestNeighbors = 5
raccoon.config.className = 'Post'
raccoon.config.numOfRecStore = 30


const {
  stats,
  addpost,
  findAllPosts,
  UpdatePostAvailability,
  findPostById,
  percent,
  findPostByIdHost,
  signalerpost,
  deletePost,
  IdHostByIdPost,
  UpdatePostById,
  SetDate,
  UpdatePostStatus,
  SetFeedBack,
  GetFeedBackByIdAgent,
  assignAgent,
  DeclinePostWithReason,
  EditPost,
} = require('../controllers/post')

const { addrating, addcomment } = require('../controllers/rating')
const {
  addnotification,
} = require('../controllers/notification')
 
router.get('/deletePost', deletePost)
// router.get('/getRec/:id', getRecomndations)
// router.post('/likePost/:userId/:postId', likePost)

router.post('/addnotification', addnotification)
router.post('/findPostByIdHost', findPostByIdHost)
router.post('/signalerpost', signalerpost)
router.get('/stats', stats)
router.get('/percent', percent)
router.put('/addrating', addrating)
router.put('/addcomment', addcomment)
router.post('/addpost', addpost)
router.get('/findAllPosts', findAllPosts)
router.get('/findPostById/:id', findPostById)
router.patch('/UpdatePostById/:id', UpdatePostById)
router.patch('/UpdatePostAvailability/:id', UpdatePostAvailability)

//agent
//agent
router.post('/setdate', SetDate)
router.patch('/UpdatePostAvailability/:id', UpdatePostAvailability)
router.post('/DeclinePostWithReason', DeclinePostWithReason)
router.post('/EditPost', EditPost)
router.post('/UpdatePostStatus', UpdatePostStatus)
router.patch('/UpdatePostAvailability/:id', UpdatePostAvailability)
router.get('/IdHostByIdPost', IdHostByIdPost)
router.post('/setdate', SetDate)
router.post('/setfeedback', SetFeedBack)
router.post('/assignAgent', assignAgent)
router.get('/getfeedbackbyidagent', GetFeedBackByIdAgent)

router.get('/rec/:id', async (req, res) => {
  let tab = []
  let tab2 = []
  raccoon
    .recommendFor(req.params.id, 5)
    .then(async (result) => {
      await Post.find({ _id: result }).then((ress) => {
        res.json(ress)
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/liked', async (req, res) => {
  let { userId, postId } = req.body

  raccoon
    .liked(userId, postId)
    .then(() => {
      let body = { userId, postId }
      fetch(`http://localhost:8000/addfav?postId=${postId}&userId=${userId}`, {
        method: 'POST',
        body: body,
      })
        .then(res.send('user ' + userId + ' liked : ' + postId))
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => console.log(err))
})

module.exports = router

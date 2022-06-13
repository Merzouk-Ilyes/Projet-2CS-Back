const express = require('express')
const router = express.Router()
const raccoon = require('raccoon')

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
} = require('../../AccountManagement/controllers/notification')

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

router.get('/rec/:id', (req, res) => {
  console.log(`the result is `)

  raccoon
    .recommendFor(req.params.id, 5)
    .then((result) => {
      console.log(`the result is ${result}`)
      res.json(result)
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/liked/:userId/:postId', (req, res) => {
  let { userId, postId } = req.params
  raccoon
    .liked(userId, postId)
    .then(() => {
      console.log('user ' + userId + ' liked hotel: ' + postId)
      res.send('user ' + userId + ' liked : ' + postId)
    })
    .catch((err) => console.log(err))
})

module.exports = router

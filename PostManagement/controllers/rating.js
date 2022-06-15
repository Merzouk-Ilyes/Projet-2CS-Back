const Post = require('../models/post')
var mongoose = require('mongoose')
const fetch = require('node-fetch')
const raccoon = require('raccoon')

raccoon.config.nearestNeighbors = 5
raccoon.config.className = 'Post'
raccoon.config.numOfRecStore = 30

exports.addrating = async (req, res) => {
  const client = req.query.id // we should get the value from the rqst
  const id_post = req.query.post //we should get the value from the rqst
  const ratingvalue = req.body.ratingvalue //the value from the rating board
  const modifiedPost = Post.findById(id_post)
  fetch('http://localhost:8002/userreserved?idpost=' + id_post)
    .then((response) => response.json())
    .then((data) => {
      if (data.reserved == true) {
        Post.updateOne(modifiedPost, {
          //using push to add a new value without losing the old one
          $push: {
            rating: {
              ratingValue: ratingvalue,
              clientId: client,
            },
          },
        })
          .then((result) => {
            res.json({ msg: "can't add rating !" }) //return success msg
          })
          .catch((err) => {
            res.send(err) //return err type
          })
      }
    })
}

exports.addcomment = async (req, res) => {
  const client = req.query.id //we should get the value from the rqst
  const id_post = req.query.post //we should get the value from the rqst
  const commentvalue = req.body.commentvalue //the value from the rating board
  const modifiedPost = Post.findById(id_post)
  Post.updateOne(modifiedPost, {
    //using push to add a new value without losing the old one
    $push: {
      comment: {
        commentValue: commentvalue,
        clientId: client,
      },
    },
  })
    .then((result) => {})
    .catch((err) => {
      res.send(err) //return err type
    })
}

exports.getRecomndations = (req, res) => {
  const id = req.params
  raccoon
    .recommendFor(id, 5)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.likePost = (req, res) => {
  const { userId, postId } = req.params
  raccoon
    .liked(userId, postId)
    .then(() => {
      console.log('user ' + userId + ' liked hotel: ' + postId)
      res.send('user ' + userId + ' liked : ' + postId)
    })
    .catch((err) => console.log(err))
}

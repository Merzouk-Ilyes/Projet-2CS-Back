const Post = require("../models/Post");
var mongoose = require("mongoose");
const fetch = require("node-fetch");

//add rating ander condition that u r already reserved at least once !!
exports.addrating = async (req, res) => {
  const client = req.query.id; //we should get the value from the rqst
  const id_post = req.query.post; //we should get the value from the rqst
  const ratingvalue = req.body.ratingvalue; //the value from the rating board
  const modifiedPost = Post.findById(id_post);
  fetch("http://localhost:8002/userreserved?idpost=" + id_post)
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
            res.json({ msg: "can't add rating !" }); //return success msg
          })
          .catch((err) => {
            res.send(err); //return err type
          });
      }
    });
};

exports.addcomment = async (req, res) => {
  const client = req.query.id; //we should get the value from the rqst
  const id_post = req.query.post; //we should get the value from the rqst
  const commentvalue = req.body.commentvalue; //the value from the rating board
  const modifiedPost = Post.findById(id_post);
  Post.updateOne(modifiedPost, {
    //using push to add a new value without losing the old one
    $push: {
      comment: {
        commentValue: commentvalue,
        clientId: client,
      },
    },
  })
    .then((result) => {
      res.json({ msg: "comment added successfully" }); //return success msg
    })
    .catch((err) => {
      res.send(err); //return err type
    });
};

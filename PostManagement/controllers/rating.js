const Post = require("../models/Post");
var mongoose = require('mongoose');
// THIS FUNCTION MUST BE UPDATED WHEN THE RESERVATION SERVICE IS DONE TO ADD THE CONDITION 
exports.addrating = async (req, res) => {
const client= req.query.id;//we should get the value from the rqst
const id_post = req.query.post;//we should get the value from the rqst
const ratingvalue= req.body.ratingvalue;//the value from the rating board
const modifiedPost = Post.findById(id_post);
Post.updateOne(modifiedPost,{$push: //using push to add a new value without losing the old one 
    {
         rating:{
            ratingValue:ratingvalue,
            clientId:client
        }}
    })
   .then((result)=>{
       res.json({msg:"rating added successfully"})//return success msg
   })
   .catch((err)=>{res.send(err);//return err type 
}) };
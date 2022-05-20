const Notification = require("../models/notification");
const fetch = require('node-fetch');
const Post = require("../models/Post");
//since there are so many types of notifications and to make the code more clean we'll set a group of functions to hndl these types ! 
const GetIdHostByIdPost = (idpost) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => { 

         Post.find({_id:idpost})
         .then((result) => {
            return resolve(result[0].idUser);
         })
       }, 2000);
   });
 
}

exports.addnotification = async (req, res) => {
    var post= req.query.post;
    var src = req.query.src;
    if(src=="addreservation"){ 
    try{
    var idhost = await GetIdHostByIdPost(post);
    const notification = new Notification({id_host:idhost,type:0});
    await notification.save((err,notification) => {
      if (err) {
         res.json(err);
      } else {
         res.json(notification);
      }
    });
    }
    catch{
      console.log("opssss");
    } 
   }
    
    
  };

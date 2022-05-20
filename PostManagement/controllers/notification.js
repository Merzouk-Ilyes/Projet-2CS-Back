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
    var idhost = await GetIdHostByIdPost(post);
    if(src=="addreservation"){ 
    try{
    const notification = new Notification({id_host:idhost,type:1});
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
   if (src=="verified"){
      const notification = new Notification({id_host:idhost,type:3});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            res.json(notification);
         }
       });
   }
  /*  if(src=="declined"){
      const notification = new Notification({id_host:idhost,type:4});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            res.json(notification);
         }
       });
   } */
   if(src=="setdate"){
      var date= req.query.date;
       console.log(date);
      const notification = new Notification({id_host:idhost,type:2,date:date});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            res.json(notification);
         }
       });
   } 
  };

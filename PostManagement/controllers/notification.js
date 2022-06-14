const Notification = require("../models/notification");
const fetch = require('node-fetch');
const Post = require("../models/post");
//since there are so many types of notifications and to make the code more clean we'll set a group of functions to hndl these types ! 
const GetIdHostByIdPost = (idpost) => {
   return new Promise((resolve, reject) => {
    

         Post.find({_id:idpost})
         .then((result) => {
      
            return resolve(result[0].idUser);
         })
      
   }); 
}
exports.addnotification = async (req, res) => {
const post = req.query.post;
console.log("the req is : " + req.query.post);
const src = req.query.src;
   var idhost = await GetIdHostByIdPost(post);
   console.log("idhost=>"+ idhost)
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
      console.log("m in ");
      const notification = new Notification({id_host:idhost,type:3});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            console.log(notification);
            // res.json(notification);
         }
       });
   }
    if(src=="declined"){
      const notification = new Notification({id_host:idhost,type:4});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
           console.log(notification);
         }
       });
   } 
   if(src=="setdate"){
      var date= req.query.date;
       console.log(date);
      const notification = new Notification({id_host:idhost,type:2,date:date});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            // res.json(notification);
            console.log(notification)
         }
       });
   }  
   if(src=="assignagent"){
      var id_agent = req.query.agent;
      const notification = new Notification({id_host:id_agent,type:5});
      await notification.save((err,notification) => {
         if (err) {
            res.json(err);
         } else {
            console.log("great!");
         }
       });
   }  

  };

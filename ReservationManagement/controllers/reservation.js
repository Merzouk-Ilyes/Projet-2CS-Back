const Reservation = require("../models/reservation");

exports.addreservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  
  await reservation.save((err, post) => {
    if (err) {
       res.json(err);
    } else {
       res.json(post);
    }
  });
};
exports.deletereservation = async (req, res) => {
   const reservation = new Reservation();
   const idreservation= req.query.reservation;
 Reservation.deleteOne({_id:idreservation})
 .then((result)=>{
   res.json(result)
})
.catch((err)=>{
    res.send(err);
})


  };
//this method tell us if the user has been reserved in this post before
exports.UserReserved= async (req, res) => {
    console.log("m in");
    const iduser= req.query.iduser;
    const idpost= req.query.idpost;
    Reservation.find({id_post:idpost,id_user:iduser})
    .then((result)=>{
        if( Object.keys(result).length >0 ){
            res.json({reserved:true})
        }else{
            res.json({reserved:false})
        }
    })
    .catch((err)=>{
        res.send(err);
    })
  };
  
  //this method tell us if the user has been reserved in this post before
exports.PostHasReservations = async (req, res) => {
    const idpost= req.query.idpost;
    Reservation.find({id_post:idpost})
    .then((result)=>{
        if( Object.keys(result).length>0 ){
            res.json({HasReservations:true,result})
        }else{
            res.json({HasReservations:false,result})
        }
    })
    .catch((err)=>{
        res.send(err);
    })
  };
  
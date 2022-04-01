const User = require('../models/User')
const jwt = require('jsonwebtoken') 


 





exports.signup = (req, res) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({
      user,
    })
  })
} ;

exports.login = (req , res) => {

  const {email , password } = req.body 
  User.findOne({email} , (err , user )  => {
    if (err || !user ) {
      return res.status(400).json({
        err : 'this user does not exists ' , 
     })
    } 
    if (!user.authenticate(password) ) {

      return res.status(400).json({
        //  err : 'this user does not exists ' , 
            err : 'wrong password  ' , 
          //  return res.json({message : "logged in "})  
       })
    }   
    
    
     const token = jwt.sign({_id : user.id} , process.env.JWT_SECRET)
      res.cookie('token' , token , { expire : new Date +9999 })
      const { _id , name , email , role } = user 
      return res.json({ token , user : { _id , email , name , role } }) 
   
    })

}   ; 

exports.logout = (req , res )=> {
  res.clearCookie('token') 
  res.json({messagr : 'logout secceeded'})
}


 

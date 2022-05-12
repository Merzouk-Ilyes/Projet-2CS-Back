const Post = require("../models/Post");
/* the host only can use this method when he is validated*/
exports.addpost = async (req, res) => {
  const post = new Post(req.body);
  await post.save((err, post) => {
    if (err) {
       res.json(err);
    } else {
       res.json(post);
    }
  });
};
/*this method could be used in the consultation page(see all posts) with no recommendation*/
exports.findAllPosts = async (req, res) => {

  Post.find()
    .then((result) => {
   const RatinTotalOfAllPosts = []
    for (let index = 0; index <result.length; index++) {
         const rating = result[index].rating;
         console.log(rating.length);  
         RatinTotalOfAllPosts.push(rating.length);
      }
      res.json({result, RatinTotalOfAllPosts});
    })
    .catch((err) => {
      res.send(err);
    });
};
/* method used when see more button in clicked */
exports.findPostById=async (req, res) => {
   const id= req.params.id ;
   Post.findById(id)
   .then((result)=>{
       res.json({result,})
   })
   .catch((err)=>{
       res.send(err);
   })
}
/* used by the admin to change the post status  */
exports.UpdatePostById=async (req, res) => {
   const id= req.params.id ;
   const modifiedPost = Post.findById(id)
   Post.updateOne(modifiedPost,{verified:true})
   .then((result)=>{
       res.json({ result, })
   })
   .catch((err)=>{res.send(err);})
}
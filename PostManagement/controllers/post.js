const Post = require('../models/Post')

exports.addpost= async (req, res) => {
    const post= new Post(req.body);
    await post.save((err, post) => {
        if (err) {
          return res.json(err)
        }})

}
exports.findAllPosts= async (req, res) => {
    Post.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
}
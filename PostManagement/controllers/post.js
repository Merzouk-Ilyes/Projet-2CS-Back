const Post = require("../models/Post");

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
exports.findAllPosts = async (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

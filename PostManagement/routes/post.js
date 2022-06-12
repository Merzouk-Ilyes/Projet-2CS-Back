const express = require("express");
const router = express.Router();
const {
  addpost,
  findAllPosts,
  UpdatePostAvailability,
  findPostById,
  stats,
  percent,
  findPostByIdHost,
  signalerpost,
  deletePost,
  IdHostByIdPost,
  UpdatePostById,
  SetDate,
  UpdatePostStatus,
  SetFeedBack,
  GetFeedBackByIdAgent,
  assignAgent,
  DeclinePostWithReason,
  EditPost,
} = require("../controllers/post");
const { addrating, addcomment } = require("../controllers/rating");
const { addnotification } = require("../controllers/notification");
router.get("/UpdatePostById", UpdatePostById);
router.get("/IdHostByIdPost", IdHostByIdPost);

router.post("/deletePost", deletePost);
router.post("/addnotification", addnotification);
router.post("/findPostByIdHost", findPostByIdHost);
router.post("/signalerpost", signalerpost);
router.get("/stats", stats);
router.get("/percent", percent);
router.put("/addrating", addrating);
router.put("/addcomment", addcomment);
router.post("/addpost", addpost);
router.get("/findAllPosts", findAllPosts);
router.get("/findPostById/:id", findPostById);

router.patch("/UpdatePostById/:id", UpdatePostById);
//agent
router.post("/setdate", SetDate);
router.patch("/UpdatePostAvailability/:id", UpdatePostAvailability);
router.post("/DeclinePostWithReason", DeclinePostWithReason);
router.post("/EditPost", EditPost);
router.post("/UpdatePostStatus", UpdatePostStatus);
router.patch("/UpdatePostAvailability/:id", UpdatePostAvailability);
router.get("/IdHostByIdPost", IdHostByIdPost);
router.post("/setdate", SetDate);
router.post("/setfeedback", SetFeedBack);
router.post("/assignAgent", assignAgent);
router.get("/getfeedbackbyidagent", GetFeedBackByIdAgent);

module.exports = router;

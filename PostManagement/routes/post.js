const express = require("express");
const router = express.Router();

const {
  addpost,
  findAllPosts,
  findPostById,
  stats,
  percent,
  findPostByIdHost,
  signalerpost,
  deletePost,
  IdHostByIdPost,
  SetDate,
  UpdatePostAvailability,
  UpdatePostStatus,
  SetFeedBack,
  GetFeedBackByIdAgent,
  assignAgent
} = require("../controllers/post");

const { addrating, addcomment } = require("../controllers/rating");
const {
  addnotification
} = require("../../AccountManagement/controllers/notification");

router.get("/deletePost", deletePost);
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
router.post("/UpdatePostStatus", UpdatePostStatus);
router.patch("/UpdatePostAvailability/:id", UpdatePostAvailability);
router.get("/IdHostByIdPost", IdHostByIdPost);
router.post("/setdate", SetDate);
router.post("/setfeedback",SetFeedBack);
router.post("/assignagent", assignAgent);
router.get("/getfeedbackbyidagent",GetFeedBackByIdAgent);

module.exports = router;

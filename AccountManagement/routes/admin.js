const express = require("express");
const router = express.Router();
const { getAllAccounts,validateEmail,validateAccount } = require("../controllers/admin");

router.get("/accounts", getAllAccounts);
router.post("/validateEmail", validateEmail);
router.post("/validateAccount", validateAccount);

module.exports = router;

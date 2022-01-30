const express = require("express");
const { signInSignUpHelper } = require("../controllers/auth");
const router = express.Router();

router.post("/signin", signInSignUpHelper)

module.exports = router;


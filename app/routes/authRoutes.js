const express = require("express");
const { signUp, signIn } = require("../controllers/authController");
const { validateSignUp, validateSignIn } = require("../utils/validation");

const router = express.Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/signIn", validateSignIn, signIn);

module.exports = router;

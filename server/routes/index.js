const express = require("express");
const registerUser = require("../controller/RegisterUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

const router = express.Router();

// creons l' API
router.post("/register", registerUser)

//verification de l'email du user
router.post("/email", checkEmail);

//verification du mot de passe
router.post("/password", checkPassword);

//information de l'enreigistrement du user
router.get("/userDetails", getUserDetailsFromToken);

module.exports = router;

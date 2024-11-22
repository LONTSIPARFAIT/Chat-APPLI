const express = require("express");
const registerUser = require("../controller/RegisterUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/searchUser");

const router = express.Router();

// creons l' API
router.post("/register", registerUser)
//verification de l'email du user
router.post("/email", checkEmail);
//verification du mot de passe
router.post("/password", checkPassword);
//information de l'enreigistrement du user
router.get("/user-details", userDetails);
//Deconnexions du user
router.get("/logout", logout)
//modifier un user
router.post('/update-user', updateUserDetails)
//Rechercher un user
router.post('/search-user', searchUser)

module.exports = router;

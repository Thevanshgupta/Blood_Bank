const express = require('express');
const { registerController, loginController, currentUserController } = require("../controllers/authcontroller");
const authMiddelware = require('../middlewares/authMiddelware');

const router = express.Router();






//routes
//Register || post
router.post("/register", registerController );

//login || post
router.post("/login", loginController );

//get current user || get
router.get("/current-user", authMiddelware, currentUserController);
module.exports = router;
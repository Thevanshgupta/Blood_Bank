const express = require("express");
const authMiddelware = require('../middlewares/authMiddelware');
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");
const router = express.Router();


//routes
// ADD INVENTORY || post

router.post("/create-inventory", authMiddelware, createInventoryController);

// get all blood records
router.get("/get-inventory", authMiddelware, getInventoryController );


module.exports = router;

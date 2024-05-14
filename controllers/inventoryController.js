const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel"); // Adjust the file path as per your project structure

const createInventoryController = async (req, res) => {
    try {
      const { email ,inventoryType } = req.body;
      //validation
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("User Not Found");
      }
        if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
     }
     if (inventoryType === "out" && user.role !== "hospital") {
       throw new Error("Not a hospital");
     }
     //save record
     const inventory = new inventoryModel(req.body);
     await inventory.save();
     return res.status(201).send({
        success: true,
        message: "New blood record added",
     });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success:false,
                message: "Error in Creating inventory API",
                error: error.message,
            });
        }
};


// get all blood records
const getInventoryController = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body for debugging
    const organizationId = req.body.organisation;
    const inventory = await inventoryModel
      .find({ organisation: organizationId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    console.log("Inventory:", inventory); // Log retrieved inventory for debugging
    return res.status(200).send({
      success: true,
      message: "Retrieved inventory records successfully",
      inventory,
    });
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    return res.status(500).send({
      success: false,
      message: "Error retrieving inventory records",
      error: error.message,
    });
  }
};



module.exports = { createInventoryController, getInventoryController };
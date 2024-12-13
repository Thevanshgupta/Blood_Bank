const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "user", "organisation", "donor", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        return this.role === "donor" || this.role === "admin";
      },
    },
    organisationName: {
      type: String,
      required: function () {
        return this.role === "organisation";
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital";
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

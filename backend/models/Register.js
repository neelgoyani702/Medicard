const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Register = mongoose.model("register", RegisterSchema);

module.exports = Register;

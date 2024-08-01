const { Schema, model } = require("mongoose");

const emailRegex = /^[\w.-]+@[\w-]+\.[\w]{2,3}$/;

// Define User Schema
const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: {
    type: String,
    min: [3, "Minimum length is 3"],
  },
  password: { type: String, required: [true, "Password is required"] }, // hashed
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (v) => emailRegex.test(v),
      message: (p) => p.value + " is not a valid email",
    },
  },
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
});

const User = model("User", userSchema);

module.exports = User;

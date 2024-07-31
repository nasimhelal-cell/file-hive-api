const mongoose = require("mongoose");

const emailRegex = /^[\w.-]+@[\w-]+\.[\w]{2,3}$/;

// Define User Schema
const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
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

// Define Folder Schema
const folderSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userID is required"],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
    required: [true, "parentID is required"],
  },
  name: {
    type: String,
    required: [true, "Folder name is required"],
  },
  path: { type: String, required: [true, "Folder path is required"] },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

// Define File Schema
const fileSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userID is required"],
  },
  link: { type, String, required: [true, "File link is required"] },
  name: { type, String, required: [true, "File name is required"] },
  type: { type, String, required: [true, "File type is required"] },
  size: { type, Number, required: [true, "File size is required"] },
  folderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: [true, "Folder is required"],
  },
});

// Define Comment Schema
const commentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: [true, "FileID is required"],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is required"],
  },
  content: { type: String, required: [true, "Comment content is required"] },
});

// Define Annotation Schema
const annotationSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: [true, "FileID is required"],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is required"],
  },
  content: { type: String, required: [true, "Annotation content is required"] },
  position: {
    type: String,
    required: [true, "Annotation position  is required"],
  },
});

module.exports = {
  Folder: mongoose.model("Folder", folderSchema),
  User: mongoose.model("User", userSchema),
  File: mongoose.model("File", fileSchema),
  Comment: mongoose.model("Comment", commentSchema),
  Annotation: mongoose.model("Annotation", annotationSchema),
};

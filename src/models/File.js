const { Schema, model } = require("mongoose");

// Define File Schema
const fileSchema = new Schema({
  id: Schema.Types.ObjectId,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userID is required"],
  },
  link: { type: String, required: [true, "File link is required"] },
  name: { type: String, required: [true, "File name is required"] },
  type: { type: String, required: [true, "File type is required"] },
  size: { type: Number, required: [true, "File size is required"] },
  folderID: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
    required: [true, "Folder is required"],
  },
});

const File = model("File", fileSchema);

module.exports = File;

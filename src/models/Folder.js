const { Schema, model } = require("mongoose");

// Define Folder Schema
const folderSchema = new Schema({
  id: Schema.Types.ObjectId,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userID is required"],
  },
  parentID: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  name: {
    type: String,
    required: [true, "Folder name is required"],
  },
  path: { type: String, required: [true, "Folder path is required"] },
  folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

const Folder = model("Folder", folderSchema);

module.exports = Folder;

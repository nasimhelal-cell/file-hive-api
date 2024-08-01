const { Schema, model } = require("mongoose");

// Define Comment Schema
const commentSchema = new Schema({
  id: Schema.Types.ObjectId,
  fileID: {
    type: Schema.Types.ObjectId,
    ref: "File",
    required: [true, "FileID is required"],
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is required"],
  },
  content: { type: String, required: [true, "Comment content is required"] },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

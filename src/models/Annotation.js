const { Schema, model } = require("mongoose");

// Define Annotation Schema
const annotationSchema = new Schema(
  {
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
    content: {
      type: String,
      required: [true, "Annotation content is required"],
    },
    position: {
      type: String,
      required: [true, "Annotation position  is required"],
    },
  },
  { timestamps: true }
);

const Annotation = model("Annotation", annotationSchema);

module.exports = Annotation;

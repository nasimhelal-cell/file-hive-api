const deleteFile = require("./delete");
const download = require("./download");
const undo = require("./undo");
const upload = require("./upload");
const view = require("./view");

module.exports = {
  upload,
  view,
  undo,
  download,
  deleteFile,
};

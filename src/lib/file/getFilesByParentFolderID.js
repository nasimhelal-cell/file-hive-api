const { File } = require("@/models");

const getFilesByParentFolderID = ({ folderID }) => {
  return File.find({ folderID });
};

module.exports = getFilesByParentFolderID;

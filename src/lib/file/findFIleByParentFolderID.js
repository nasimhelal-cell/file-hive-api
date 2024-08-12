const { File } = require("@/models");

const findFIleByParentFolderID = ({ folderID }) => {
  return File.find({ folderID });
};

module.exports = findFIleByParentFolderID;

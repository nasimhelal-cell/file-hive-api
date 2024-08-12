const { Folder } = require("@/models");

const findChildFoldersByID = ({ ID }) => {
  return Folder.find({ parentID: ID });
};

module.exports = findChildFoldersByID;

const { Folder } = require("@/models");

const findChildFoldersByID = ({ ID, select = [] }) => {
  return Folder.find({ parentID: ID }).select(select);
};

module.exports = findChildFoldersByID;

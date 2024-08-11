const { Folder } = require("@/models");

const createFolder = async ({ name, parentID, path, userID }) => {
  const folder = new Folder({ name, parentID, path, userID });
  return folder.save();
};
module.exports = createFolder;

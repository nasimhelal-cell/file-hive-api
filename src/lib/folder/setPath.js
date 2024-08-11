const findFolderByID = require("./findFolderByID");

const setPath = async ({ parentID }) => {
  let path = ".";
  if (parentID) {
    let folderForPath = await findFolderByID({ ID: parentID });

    path = folderForPath.path + "/" + folderForPath._id;
  }
  return path;
};

module.exports = setPath;

const findFolderByID = require("./findFolderByID");
const findChildFoldersByID = require("./findChildFoldersByID");
const getFilesByParentFolderID = require("../file/getFilesByParentFolderID");

const getFolder = async ({ folderID }) => {
  const folder = await findFolderByID({ ID: folderID });

  const childFolders = await findChildFoldersByID({ ID: folder._id });
  const files = await getFilesByParentFolderID({ folderID });

  const data = { ...folder, folders: childFolders, files };
  return data;
};

module.exports = getFolder;

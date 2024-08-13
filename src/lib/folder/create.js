const generateUniqueFolderName = require("./generateUniqueFolderName");
const generatePath = require("./generatePath");
const createFolder = require("./createFolder");
const calculateNamePath = require("@/api/v1/folder/utils.js");

const create = async ({ name, parentID, userID }) => {
  // set new name like newFolder 1/2/3/4
  const uniqueName = await generateUniqueFolderName({ name, parentID });

  //set path for every folder
  const newPath = await generatePath({ parentID });

  let folder = await createFolder({
    name: uniqueName,
    path: newPath,
    parentID,
    userID,
  });

  const pathName = await calculateNamePath({ path: folder.path });

  return { ...folder._doc, pathName };
};

module.exports = create;

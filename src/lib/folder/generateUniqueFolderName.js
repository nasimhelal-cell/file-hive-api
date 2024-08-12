const { Folder } = require("@/models");

const generateUniqueFolderName = async ({ name, parentID }) => {
  let folderName = name;
  let counter = 1;

  // Check if a folder with the same name exists
  let existingFolder = await Folder.findOne({ name: folderName, parentID });

  while (existingFolder) {
    // If it exists, append the counter to the folder name
    folderName = `${name}${counter}`;
    counter++;
    existingFolder = await Folder.findOne({ name: folderName, parentID });
  }

  return folderName;
};

module.exports = generateUniqueFolderName;

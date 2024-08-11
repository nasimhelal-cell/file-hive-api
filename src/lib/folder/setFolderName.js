const { badRequest } = require("@/error");

const setFolderName = ({ existingFolderName, name }) => {
  if (existingFolderName === name) {
    return badRequest("Folder already exist with this name. Try another name");
  }
  return name;
};

module.exports = setFolderName;

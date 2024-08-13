const { Folder } = require("@/models");

const renameFolder = ({ updatedName, ID }) => {
  return Folder.findByIdAndUpdate(
    ID,
    { $set: { name: updatedName } },
    { new: true }
  );
};

module.exports = renameFolder;

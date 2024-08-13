const findFolderByID = require("./findFolderByID");
const generateUniqueFolderName = require("./generateUniqueFolderName");
const renameFolder = require("./renameFolder");
const findChildFoldersByID = require("./findChildFoldersByID");
const { getFilesByParentFolderID } = require("@/lib/file");

const { notFound } = require("@/error");

const rename = async ({ folderID, name }) => {
  let updatedName = name;
  const folder = await findFolderByID({ ID: folderID });

  if (!folder) {
    return notFound(`Folder is not found`);
  }

  // if prev name and update name is not same
  if (folder.name !== name) {
    updatedName = await generateUniqueFolderName({
      name,
      parentID: folder.parentID,
    });
  }

  const finalFolder = await renameFolder({
    ID: folderID,
    updatedName,
  });

  const childFolders = await findChildFoldersByID({ ID: folderID });
  const files = await getFilesByParentFolderID({ folderID });

  const data = { ...finalFolder._doc, folders: childFolders, files };
  return data;
};

module.exports = rename;

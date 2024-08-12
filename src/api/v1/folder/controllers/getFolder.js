const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const { findFolderByID } = require("@/lib/folder");
const { findChildFoldersByID } = require("../../../../lib/folder");
const { findFIleByParentFolderID } = require("../../../../lib/file");

const getFolder = catchAsync(async (req, res) => {
  const { folderID } = req.params;

  const folder = await findFolderByID({ ID: folderID });

  const childFolders = await findChildFoldersByID({ ID: folder._id });
  const files = await findFIleByParentFolderID({ folderID });

  const data = { ...folder, folders: childFolders, files };

  const response = {
    code: StatusCodes.OK,
    message: "Folder details retrieved successfully",
    data,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = getFolder;

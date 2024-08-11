const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const {
  createFolder,
  findFolderByNameAndID,
  setPath,
  setFolderName,
} = require("@/lib/folder");

const create = catchAsync(async (req, res) => {
  let { name, parentID, path } = req.body;
  const userID = req.user._id;

  const existingFolder = await findFolderByNameAndID({ name, parentID });

  // set new name like newFolder 1/2/3/4
  name = setFolderName({ existingFolderName: existingFolder?.name, name });

  //set path for every folder
  path = await setPath({ parentID });

  const folder = await createFolder({ name, parentID, path, userID });

  const response = {
    code: StatusCodes.CREATED,
    message: "Folder Created successfully",
    data: folder,
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = create;

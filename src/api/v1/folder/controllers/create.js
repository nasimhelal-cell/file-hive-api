const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const {
  createFolder,
  generatePath,
  generateUniqueFolderName,
} = require("@/lib/folder");
const calculateNamePath = require("../utils");

const create = catchAsync(async (req, res) => {
  let { name, parentID } = req.body;
  const userID = req.user._id;

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

  const response = {
    code: StatusCodes.CREATED,
    message: "Folder Created successfully",
    data: { ...folder._doc, pathName },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = create;

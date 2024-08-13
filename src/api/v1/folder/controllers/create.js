const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const folderServices = require("@/lib/folder");

const create = catchAsync(async (req, res) => {
  let { name, parentID } = req.body;
  const userID = req.user._id;

  let data = await folderServices.create({ name, parentID, userID });

  const response = {
    code: StatusCodes.CREATED,
    message: "Folder Created successfully",
    data,
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = create;

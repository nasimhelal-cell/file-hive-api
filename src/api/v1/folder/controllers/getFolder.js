const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");

const folderServices = require("@/lib/folder");

const getFolder = catchAsync(async (req, res) => {
  const { folderID } = req.params;

  const data = await folderServices.getFolder({ folderID });

  const response = {
    code: StatusCodes.OK,
    message: "Folder details retrieved successfully",
    data,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = getFolder;

const folderServices = require("@/lib/folder");
const { catchAsync } = require("@/utils");

const { StatusCodes } = require("http-status-codes");

const rename = catchAsync(async (req, res) => {
  let { name } = req.body;
  const { folderID } = req.params;

  const data = await folderServices.rename({ folderID, name });

  const response = {
    code: StatusCodes.OK,
    message: "Folder renamed",
    data,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = rename;

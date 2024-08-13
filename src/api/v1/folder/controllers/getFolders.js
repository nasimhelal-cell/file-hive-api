const findChildFoldersByID = require("@/lib/folder/findChildFoldersByID");
const { StatusCodes } = require("http-status-codes");

const getFolders = async (req, res) => {
  const { folderID: parentFolderID } = req.params;

  const data = await findChildFoldersByID({
    ID: parentFolderID,
    select: ["name", "path", "parentID"],
  });

  const response = {
    code: StatusCodes.OK,
    message: "Folders retrieved successfully",
    data,
  };

  res.status(StatusCodes.OK).json(response);
};

module.exports = getFolders;

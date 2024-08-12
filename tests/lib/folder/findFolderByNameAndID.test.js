const { Folder } = require("@/models");
const { findFolderByNameAndID } = require("@/lib/folder");

jest.mock("../../../src/models", () => ({
  Folder: {
    findOne: jest.fn(),
  },
}));

describe("findFolderByNameAndID", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a folder obj when exist in database", async () => {
    let mockFolder = {
      _doc: { name: "mockFolderName", path: "mockPath" },
    };
    let mockName = "mockName";
    let mockParentID = "mockParentID";
    Folder.findOne.mockResolvedValue(mockFolder);

    let folder = await findFolderByNameAndID({
      name: mockName,
      parentID: mockParentID,
    });

    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockName,
      parentID: mockParentID,
    });
    expect(folder).toBe(mockFolder._doc);
  });

  it("should return false if cannot found any folder in the database", async () => {
    let mockName = "no-exist-Name";
    let mockParentID = "mockParentID";
    Folder.findOne.mockResolvedValue(null);

    let folder = await findFolderByNameAndID({
      name: mockName,
      parentID: mockParentID,
    });

    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockName,
      parentID: mockParentID,
    });
    expect(folder).toBeFalsy();
  });

  it("should handle errors thrown in database", async () => {
    let mockName = "mocked_Name";
    let mockError = new Error("Database error");
    let mockParentID = "mockParentID";

    Folder.findOne.mockRejectedValue(mockError);

    await expect(
      findFolderByNameAndID({ name: mockName, parentID: mockParentID })
    ).rejects.toThrow(mockError);
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockName,
      parentID: mockParentID,
    });
  });
});

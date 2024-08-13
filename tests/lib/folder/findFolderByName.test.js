const { findFolderByName } = require("@/lib/folder");
const { Folder } = require("@/models");

jest.mock("../../../src/models", () => ({
  Folder: {
    findOne: jest.fn(),
  },
}));

describe("findFolderByName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a folder obj when exist in database", async () => {
    let mockFolder = {
      _doc: { name: "mockFolderName", path: "mockPath" },
    };
    let mockName = "mockName";
    Folder.findOne.mockResolvedValue(mockFolder);

    let folder = await findFolderByName({ name: mockName });

    expect(Folder.findOne).toHaveBeenCalledWith({ name: mockName });
    expect(folder).toBe(mockFolder._doc);
  });

  it("should return false if cannot found any folder in the database", async () => {
    let mockName = "no-exist-Name";
    Folder.findOne.mockResolvedValue(null);

    let folder = await findFolderByName({ name: mockName });

    expect(Folder.findOne).toHaveBeenCalledWith({ name: mockName });
    expect(folder).toBeFalsy();
  });

  it("should handle errors thrown in database", async () => {
    let mockName = "mocked_Name";
    let mockError = new Error("Database error");

    Folder.findOne.mockRejectedValue(mockError);

    await expect(findFolderByName({ name: mockName })).rejects.toThrow(
      mockError
    );
    expect(Folder.findOne).toHaveBeenCalledWith({ name: mockName });
  });
});

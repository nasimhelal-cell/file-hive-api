const { findFolderByID } = require("../../../src/lib/folder");
const { Folder } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  Folder: {
    findById: jest.fn(),
  },
}));

describe("findFolderByID", () => {
  it("should return a folder obj when exist in database", async () => {
    let mockFolder = {
      _doc: { name: "mockFolderName", path: "mockPath" },
    };
    let mockID = "mockID";
    Folder.findById.mockResolvedValue(mockFolder);

    let folder = await findFolderByID({ ID: mockID });

    expect(Folder.findById).toHaveBeenCalledWith(mockID);
    expect(folder).toBe(mockFolder._doc);
  });

  it("should return false if cannot found any folder in the database", async () => {
    let mockID = "no-exist-id";
    Folder.findById.mockResolvedValue(null);

    let folder = await findFolderByID({ ID: mockID });

    expect(Folder.findById).toHaveBeenCalledWith(mockID);
    expect(folder).toBeFalsy();
  });

  it("should handle errors thrown in database", async () => {
    let mockID = "mocked_id";
    let mockError = new Error("Database error");

    Folder.findById.mockRejectedValue(mockError);

    await expect(findFolderByID({ ID: mockID })).rejects.toThrow(mockError);
    expect(Folder.findById).toHaveBeenCalledWith(mockID);
  });
});

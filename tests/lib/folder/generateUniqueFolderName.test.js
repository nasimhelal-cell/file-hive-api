const { Folder } = require("@/models");
const { generateUniqueFolderName } = require("@/lib/folder");

jest.mock("../../../src/models", () => ({
  Folder: {
    findOne: jest.fn(),
  },
}));

describe("generateUniqueFolderName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the original folder name it no folder with the same name exist", async () => {
    const mockFolderName = "mockFolderName";
    const mockParentID = "mockParentID";

    Folder.findOne.mockResolvedValue(null);

    const result = await generateUniqueFolderName({
      name: mockFolderName,
      parentID: mockParentID,
    });

    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockFolderName,
      parentID: mockParentID,
    });
    expect(result).toBe(mockFolderName);
  });

  it("should append a counter to the folder name if a folder with same name exists", async () => {
    const mockFolderName = "mockFolderName";
    const mockParentID = "mockParentID";

    // Simulate that a folder with the original name exists
    Folder.findOne
      .mockResolvedValueOnce({ name: mockFolderName, parentID: mockParentID })
      .mockResolvedValueOnce(null);

    const result = await generateUniqueFolderName({
      name: mockFolderName,
      parentID: mockParentID,
    });

    expect(Folder.findOne).toHaveBeenCalledTimes(2);
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockFolderName,
      parentID: mockParentID,
    });
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: `${mockFolderName}1`,
      parentID: mockParentID,
    });
    expect(result).toBe(`${mockFolderName}1`);
  });

  it("should increment the counter correctly if multiple folders with the same name exist", async () => {
    const mockFolderName = "mockFolderName";
    const mockParentID = "mockParentID";

    // Simulate that multiple folders with the same name exist
    Folder.findOne
      .mockResolvedValueOnce({ name: mockFolderName, parentID: mockParentID })
      .mockResolvedValueOnce({
        name: `${mockFolderName}1`,
        parentID: mockParentID,
      })
      .mockResolvedValueOnce({
        name: `${mockFolderName}2`,
        parentID: mockParentID,
      })
      .mockResolvedValueOnce(null);

    const result = await generateUniqueFolderName({
      name: mockFolderName,
      parentID: mockParentID,
    });

    expect(Folder.findOne).toHaveBeenCalledTimes(4);
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockFolderName,
      parentID: mockParentID,
    });
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: `${mockFolderName}1`,
      parentID: mockParentID,
    });
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: `${mockFolderName}2`,
      parentID: mockParentID,
    });
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: `${mockFolderName}3`,
      parentID: mockParentID,
    });
    expect(result).toBe(`${mockFolderName}3`);
  });

  it("should handle errors thrown by the database", async () => {
    const mockFolderName = "mockFolderName";
    const mockParentID = "mockParentID";
    const mockError = new Error("Database error");

    // Simulate an error thrown by findOne
    Folder.findOne.mockRejectedValue(mockError);

    await expect(
      generateUniqueFolderName({ name: mockFolderName, parentID: mockParentID })
    ).rejects.toThrow(mockError);
    expect(Folder.findOne).toHaveBeenCalledWith({
      name: mockFolderName,
      parentID: mockParentID,
    });
  });
});

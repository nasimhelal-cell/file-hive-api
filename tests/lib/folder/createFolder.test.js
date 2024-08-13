const { Folder } = require("@/models");
const { createFolder } = require("@/lib/folder");

jest.mock("../../../src/models", () => ({
  Folder: jest.fn(),
}));

describe("createFolder", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save a new folder with the provided properties", async () => {
    const mockName = "NewFolder";
    const mockParentID = "parent-folder-id";
    const mockPath = "/parentFolder";
    const mockUserID = "user-id";
    const mockSavedFolder = {
      _id: "new-folder-id",
      name: mockName,
      parentID: mockParentID,
      path: mockPath,
      userID: mockUserID,
    };

    // Mock the save method on the Folder instance
    const mockSave = jest.fn().mockResolvedValue(mockSavedFolder);
    Folder.mockImplementation(() => ({
      save: mockSave,
    }));

    const result = await createFolder({
      name: mockName,
      parentID: mockParentID,
      path: mockPath,
      userID: mockUserID,
    });

    // Check that the Folder constructor was called with the correct arguments
    expect(Folder).toHaveBeenCalledWith({
      name: mockName,
      parentID: mockParentID,
      path: mockPath,
      userID: mockUserID,
    });

    // Check that the save method was called and the result is correct
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe(mockSavedFolder);
  });

  it("should handle errors thrown by the save method", async () => {
    const mockName = "NewFolder";
    const mockParentID = "parent-folder-id";
    const mockPath = "/parentFolder";
    const mockUserID = "user-id";
    const mockError = new Error("Save error");

    // Mock the save method to throw an error
    const mockSave = jest.fn().mockRejectedValue(mockError);
    Folder.mockImplementation(() => ({
      save: mockSave,
    }));

    await expect(
      createFolder({
        name: mockName,
        parentID: mockParentID,
        path: mockPath,
        userID: mockUserID,
      })
    ).rejects.toThrow(mockError);
  });
});

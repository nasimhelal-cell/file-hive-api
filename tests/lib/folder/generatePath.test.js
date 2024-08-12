const { findFolderByID, generatePath } = require("../../../src/lib/folder");

jest.mock("../../../src/lib/folder/findFolderByID.js");

describe("generatePath", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a correct folder path if parent folder id id provided", async () => {
    let mockParentId = "mockParentId";
    let mockFolder = {
      _id: "mockFolder_id",
      path: "mockFolderPath",
    };

    findFolderByID.mockResolvedValue(mockFolder);

    const result = await generatePath({ parentID: mockParentId });

    expect(findFolderByID).toHaveBeenCalledWith({ ID: mockParentId });
    expect(result).toBe("mockFolderPath/mockFolder_id");
  });

  it('should return "." if no parentID is provided', async () => {
    const result = await generatePath({ parentID: null });

    expect(result).toBe(".");
  });

  it("should handle errors thrown by findFolderByID", async () => {
    const mockParentID = "parent-folder-id";
    const mockError = new Error("Database error");

    // Mock findFolderByID to throw an error
    findFolderByID.mockRejectedValue(mockError);

    await expect(generatePath({ parentID: mockParentID })).rejects.toThrow(
      mockError
    );
    expect(findFolderByID).toHaveBeenCalledWith({ ID: mockParentID });
  });
});

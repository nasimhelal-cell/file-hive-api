const { findChildFoldersByID } = require("@/lib/folder");
const { Folder } = require("@/models");

jest.mock("../../../src/models", () => ({
  Folder: {
    find: jest.fn().mockReturnThis(), // Returns `this` to allow chaining
    select: jest.fn(), // Will be mocked to return the result later
  },
}));

describe("findChildFoldersByID", () => {
  const mockID = "123";
  const mockSelect = ["name", "path"];
  const mockFolders = [{ name: "folder1", path: "/folder1" }];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find child folders by parentID", async () => {
    Folder.select.mockResolvedValueOnce(mockFolders);

    const result = await findChildFoldersByID({ ID: mockID });

    expect(Folder.find).toHaveBeenCalledWith({ parentID: mockID });
    expect(Folder.select).toHaveBeenCalledWith([]);
    expect(result).toEqual(mockFolders);
  });

  it("should find child folders by parentID with selected fields", async () => {
    Folder.select.mockResolvedValueOnce(mockFolders);

    const result = await findChildFoldersByID({
      ID: mockID,
      select: mockSelect,
    });

    expect(Folder.find).toHaveBeenCalledWith({ parentID: mockID });
    expect(Folder.select).toHaveBeenCalledWith(mockSelect);
    expect(result).toEqual(mockFolders);
  });

  it("should return an empty array if no folders are found", async () => {
    Folder.select.mockResolvedValueOnce([]);

    const result = await findChildFoldersByID({ ID: mockID });

    expect(Folder.find).toHaveBeenCalledWith({ parentID: mockID });
    expect(Folder.select).toHaveBeenCalledWith([]);
    expect(result).toEqual([]);
  });
});

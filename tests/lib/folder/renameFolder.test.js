const { Folder } = require("@/models");
const renameFolder = require("@/lib/folder/renameFolder");

jest.mock("../../../src/models", () => ({
  Folder: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("renameFolder", () => {
  const mockID = "123";
  const mockUpdateName = "mockUpdateName";
  const mockUpdatedFolder = { _id: mockID, name: mockUpdateName };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should rename the folder with the given id and newFolder name", async () => {
    Folder.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedFolder);

    const result = await renameFolder({
      updatedName: mockUpdateName,
      ID: mockID,
    });
    expect(Folder.findByIdAndUpdate).toHaveBeenCalledWith(
      mockID,
      { $set: { name: mockUpdateName } },
      { new: true }
    );
    expect(result).toEqual(mockUpdatedFolder);
  });

  it("should return null if the folder with the given ID does not exist", async () => {
    Folder.findByIdAndUpdate.mockResolvedValueOnce(null);

    const result = await renameFolder({
      updatedName: mockUpdateName,
      ID: mockID,
    });

    expect(Folder.findByIdAndUpdate).toHaveBeenCalledWith(
      mockID,
      { $set: { name: mockUpdateName } },
      { new: true }
    );
    expect(result).toBeNull();
  });

  it("should throw an error if findByIdAndUpdate fails", async () => {
    const mockError = new Error("Something went wrong");
    Folder.findByIdAndUpdate.mockRejectedValueOnce(mockError);

    await expect(
      renameFolder({ updatedName: mockUpdateName, ID: mockID })
    ).rejects.toThrow(mockError);

    expect(Folder.findByIdAndUpdate).toHaveBeenCalledWith(
      mockID,
      { $set: { name: mockUpdateName } },
      { new: true }
    );
  });
});

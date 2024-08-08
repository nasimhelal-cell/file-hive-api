const { userDefault } = require("../../../src/config");
const { createUser } = require("../../../src/lib/user");
const { User } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  User: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

describe("createUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save an user to database", async () => {
    const mockUser = {
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: "url",
      role: "viewer",
      save: jest.fn().mockResolvedValue("savedUser"),
    };

    User.mockImplementation(() => mockUser);

    const result = await createUser({
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: "url",
      role: "viewer",
    });

    expect(User).toHaveBeenCalledWith({
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: "url",
      role: "viewer",
    });
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toBe("savedUser");
  });

  it("should create and save new user with default avatar and role it not provided", async () => {
    const mockUser = {
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: "url",
      role: "viewer",
      save: jest.fn().mockResolvedValue("savedUser"),
    };

    User.mockImplementation(() => mockUser);

    const result = await createUser({
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
    });

    expect(User).toHaveBeenCalledWith({
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: userDefault.avatar,
      role: userDefault.role,
    });
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toBe("savedUser");
  });

  it("should handle errors thrown by the save method", async () => {
    const mockUser = {
      username: "name",
      email: "email@email.com",
      password: "hashed-password",
      avatar: "url",
      role: "viewer",
      save: jest.fn().mockRejectedValue(new Error("Save error")),
    };

    User.mockImplementation(() => mockUser);

    await expect(
      createUser({
        username: "name",
        email: "email@email.com",
        password: "hashed-password",
        avatar: "url",
        role: "viewer",
      })
    ).rejects.toThrow("Save error");
    expect(mockUser.save).toHaveBeenCalled();
  });
});

const createUser = require("../../../src/lib/user/createUser");
const { User } = require("../../../src/models");

jest.mock("../../../src/models/User", () => {
  const User = jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        _id: "507f191e810c19729de860ea",
        name: "John Doe",
        email: "john@example.com",
        password: "hashed-password",
        avatar: "avatar.png",
        role: "viewer",
      }),
    };
  });
  return User;
});

jest.mock("../../../src/config", () => ({
  userDefault: { role: "viewer" },
}));

describe("createUser", () => {
  it("should create and save a new user to database with passing role", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "hashed-password",
      avatar: "avatar.png",
      role: "viewer",
    };
    const newUser = await createUser(userData);

    expect(User).toHaveBeenCalledWith(userData);
    expect(newUser).toEqual(expect.objectContaining(userData));
  });

  it("should create and save new user to database with default role", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "hashed-password",
      avatar: "avatar.png",
    };
    const newUser = await createUser(userData);

    expect(User).toHaveBeenCalledWith({
      ...userData,
      role: "viewer",
    });

    expect(newUser.role).toBe("viewer");
  });
});

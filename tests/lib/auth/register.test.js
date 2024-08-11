const { badRequest } = require("@/error");
const encryptPassword = require("@/lib/auth/encryptPassword");
const register = require("@/lib/auth/register");
const { findUser, createUser } = require("@/lib/user");

jest.mock("../../../src/lib/auth/encryptPassword");
jest.mock("../../../src/error");
jest.mock("../../../src/lib/user");

describe("register service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required fields are missing", async () => {
    await register({ username: "", email: "", password: "" });

    expect(badRequest).toHaveBeenCalledWith(
      "One or more credentials are missing"
    );
  });

  it("should throw an error if user already exists", async () => {
    findUser.mockResolvedValueOnce({ email: "exists@example.com" });

    await register({
      username: "test-username",
      email: "exists@example.com",
      password: "password",
    });

    expect(badRequest).toHaveBeenCalledWith(
      "User already exists, Try with another email"
    );
  });

  it("should create a new user if all fields are valid", async () => {
    findUser.mockResolvedValueOnce(null);

    encryptPassword.mockResolvedValueOnce("hashed-password");

    createUser.mockResolvedValueOnce({
      _doc: {
        username: "test-username",
        email: "test@example.com",
        avatar: "avatar-url",
        role: "viewer",
      },
    });

    const result = await register({
      username: "test-username",
      email: "test@example.com",
      password: "password",
      avatar: "avatar-url",
      role: "viewer",
    });

    expect(createUser).toHaveBeenCalledWith({
      username: "test-username",
      email: "test@example.com",
      password: "hashed-password",
      avatar: "avatar-url",
      role: "viewer",
    });

    expect(result).toEqual({
      username: "test-username",
      email: "test@example.com",
      avatar: "avatar-url",
      role: "viewer",
    });
  });
});

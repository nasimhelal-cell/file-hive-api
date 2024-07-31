// connectDB.test.js
const mongoose = require("mongoose");
const { connectDB } = require("../../src/db");

jest.mock("mongoose", () => {
  return {
    connect: jest.fn(),
  };
});

describe("connectDB", () => {
  let server;

  beforeEach(() => {
    server = {
      listen: jest.fn((port, callback) => {
        callback();
      }),
    };
    process.env.PORT = 4000;
    process.env.DB_URL = "mongodb://localhost:27017/testdb";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to the database and start the server", async () => {
    mongoose.connect.mockResolvedValueOnce({});

    const logSpy = jest.spyOn(console, "log");

    await connectDB(server);

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL);
    expect(logSpy).toHaveBeenCalledWith("Database is connected !!! ✅");
    expect(server.listen).toHaveBeenCalledWith(4000, expect.any(Function));
    expect(logSpy).toHaveBeenCalledWith(
      "Server is listening at port: 4000 | Base url is - http://localhost:4000"
    );
  });

  it("should log an error message when database connection fails", async () => {
    mongoose.connect.mockRejectedValueOnce(new Error("Connection error"));

    const logSpy = jest.spyOn(console, "log");

    await connectDB(server);

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL);
    expect(logSpy).toHaveBeenCalledWith("Failed to connect with database! ❌");
  });
});

require("dotenv").config();
const http = require("node:http");

const { app } = require("./src/app");
const { connectDB } = require("./src/db");

const server = http.createServer(app);

connectDB(server);

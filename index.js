const http = require("node:http");
const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./app");
const { connectDB } = require("./db");


const server = http.createServer(app);

connectDB(server)


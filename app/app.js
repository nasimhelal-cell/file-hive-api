const express = require("express");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");

const { middleware } = require("./middleware");
const swaggerDocs = YAML.load("./filehive.yaml");

const app = express();

app.use(middleware);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;

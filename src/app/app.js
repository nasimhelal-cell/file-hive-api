const express = require("express");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");

const error = require("../error");
const { middleware } = require("./middleware");

const swaggerDocs = YAML.load("./filehive.yaml");

const app = express();

app.use(middleware);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(error.defaultError);

module.exports = app;

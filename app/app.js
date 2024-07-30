const express = require('express')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express');

const swaggerDocs = YAML.load('./filehive.yaml')
const app = express();

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))

module.exports = app
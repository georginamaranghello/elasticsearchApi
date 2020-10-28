const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');


const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);

app.use(log4js.connectLogger(logger, {level: logger.level}));
require('./routers/index')(app, server);


const port = process.env.PORT || localConfig.port;
server.listen(port, function () {
  logger.info(`Server Running on Port:` + port);
});

module.exports = server;
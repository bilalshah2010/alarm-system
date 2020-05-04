'use strict';

const mapRoutes = require('express-routes-mapper');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const http = require('http');
const fs = require('fs');
const config = require('./config');
const winston = config.winston;
const privateRoutes = mapRoutes(config.privateRoutes, 'src/controllers/');
const publicRoutes = mapRoutes(config.publicRoutes, 'src/controllers/');
const adminRoutes = mapRoutes(config.adminRoutes, 'src/controllers/');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '9000';
const socket = config.socket;
if (env === 'development') {
  const logsDir = './logs';
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
}
app.use(express.static('public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use('/api/v1/admin/', adminRoutes);
app.use('/api/v1/auth/', publicRoutes);
app.use('/api/v1/', config.jwtAuth);
app.use('/api/v1/', privateRoutes);
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/admin/index.html'));
});
if (env === 'development') {
  app.use(morgan('combined', {stream: winston.stream}));
}
const server = http.createServer(app);
socket.initialize(server);
server.listen(port, () => {
  console.log('Server and Socket are running on port :' + port);
}).on('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.log(`----- Port ${port} is busy, try changing port to ${port + 1} in .env file , admin/index.html and /data-source/.env -----`);
  } else {
    console.log(err);
  }
});

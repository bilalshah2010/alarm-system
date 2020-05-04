'use strict';

const publicRoutes = require('./routes').publicRoutes;
const privateRoutes = require('./routes').privateRoutes;
const adminRoutes = require('./routes').adminRoutes;
const winston = require('./winston');
const jwtAuth = require('./auth');
const socket = require('./socket');

const config = {
  publicRoutes,
  privateRoutes,
  adminRoutes,
  winston,
  jwtAuth,
  socket,
};

module.exports = config;

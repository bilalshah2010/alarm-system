'use strict';

const appRoot = require('app-root-path');
const logger = require(`${appRoot}/config/winston`);
const util = {
  logData: (data, type) =>{
    if (type === 'info') {
      logger.info(data);
    } else {
      logger.error(data);
    }
  },
  processMessage: (message, callback) =>{
    // Do some amazing stuff with image processing but now randomly send true false
    const state = Math.floor(Math.random() * 2);
    const time = Math.floor(Math.random() * 100) + 10;
    Promise.resolve().thenWait(time)
        .then(() => callback(state, time))
        .catch(() => {});
  },
};
// We can create the app prototyping here and can set utils globally
// eslint-disable-next-line no-extend-native
Promise.prototype.thenWait = function thenWait(time) {
  return this.then((result) => new Promise((resolve) => setTimeout(resolve, time, result)));
};
module.exports = util;

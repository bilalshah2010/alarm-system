'use strict';

const db = require('../src/models');
const utils = require('../src/util');

module.exports.initialize = function(server) {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    socket.on('FEED', (data) => {
      db.user.findOne({
        where: {username: data.companyName, password: data.password},
      }).then((company) => {
        if (company) {
          try {
            utils.processMessage(data.message, function(state, timeTaken) {
              db.feed.create({
                camera_id: data.id,
                name: data.companyName,
                state: state,
                message: data.message,
                time: timeTaken,
              }).then((feed) =>{
                const payload = {
                  companyId: data.companyID,
                  message: 'Success',
                  feed,
                };
                socket.emit('FEED_RESPONSE', payload);
                socket.broadcast.emit('FEED_INSERTED', feed);
                utils.logData('Feed Response ' + JSON.stringify(feed), 'info');
              });
            });
          } catch (e) {
            utils.logData('There was an error processing feed ' + JSON.stringify(e), 'error');
            socket.emit('FEED_RESPONSE',
                {id: data.id, message: 'There was an error processing feed', companyId: data.companyID});
          }
        } else {
          utils.logData('There was an error with the credentials ' + JSON.stringify(
              {id: data.id, message: 'There was an error with your credentials', companyId: data.companyID},
          ), 'error');
          socket.emit('FEED_RESPONSE',
              {id: data.id, message: 'There was an error with your credentials', companyId: data.companyID});
        }
      }).catch((err) => {
        utils.logData('There was an error querying ' + JSON.stringify(err), 'error');
        socket.emit('FEED_RESPONSE', {id: data.id, message: 'There was an error querying', companyId: data.companyID});
      });
    });
  });
};

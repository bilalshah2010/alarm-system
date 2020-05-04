'use strict';

const db = require('../src/models');
const jwt = require('jsonwebtoken');
const appRoot = require('app-root-path');
const logger = require(`${appRoot}/config/winston`);

module.exports = function(req, res, next) {
  const auth = req.header('authorization');
  if (auth) {
    const token = auth.split(' ')[1];
    logger.info({url: req.url, body: (req.method === 'POST' ||
          req.method === 'PUT') ? req.body : req.query, token: token, timestamp: new Date()});
    jwt.verify(token, process.env.JWT_SECRET,
        function(err, decoded) {
          if (err) {
            return res.status(401)
                .send({auth: false, message: 'Failed to authenticate token.'});
          }
          db.user.findOne({
            where: {id: decoded.id},
          }).then((user) => {
                user? next() : res.status(401)
                    .send({
                      auth: false,
                      message: 'Failed to authenticate token.',
                    });
          });
        });
  } else {
    res.status(401).send('Token not found');
  }
};

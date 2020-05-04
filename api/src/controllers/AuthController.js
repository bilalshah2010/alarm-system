'use strict';

const db = require('./../models');
const jwt = require('jsonwebtoken');
const utils = require('../util');

const AuthController = () => {
  const validate = async (req, res) => {
    db.user.findOne({
      where: {username: req.body.username, password: req.body.password},
      include: [{
        model: db.camera,
      }, {
        model: db.station,
        include: [{
          model: db.camera,
        }],
      }],
    }).then((company) => {
      if (company) {
        if (company.auth_type === 'jwt') {
          const token = jwt.sign({id: company.id}, process.env.JWT_SECRET, {expiresIn: 86400});
          res.json({company, token});
        } else {
          res.json({company});
        }
      } else {
        res.sendStatus(401);
      }
    }).catch((err) => {
      utils.logData('There was an error querying ' + err, 'error');
      return res.status(500).send(err);
    });
  };

  return {
    validate,
  };
};

module.exports = AuthController;

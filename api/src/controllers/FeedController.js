'use strict';

const db = require('./../models');
const utils = require('../util');

const FeedController = () => {
  const validateFeed = async (req, res) => {
    try {
      utils.processMessage(req.body.message, function(state, timeTaken) {
        db.feed.create({
          camera_id: req.body.id,
          name: req.body.companyName,
          state: state,
          message: req.body.message,
          time: timeTaken,
        }).then(() =>{
          res.json({id: req.body.id, state});
        });
      });
    } catch (error) {
      utils.logData('There was an error processing feed ' + error, 'error');
      return res.status(500).send(error);
    }
  };

  const getFeeds = async (req, res) => {
    db.feed.findAll({order:[['id', 'DESC']]}).then(feeds => {
      res.json(feeds);
    }).catch (error => {
      utils.logData('There was an error processing feed ' + error, 'error');
      return res.status(500).send(error);
    });
  };

  return {
    validateFeed,
    getFeeds
  };
};

module.exports = FeedController;

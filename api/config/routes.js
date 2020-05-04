'use strict';

const routes = {
  publicRoutes: {
    'POST /validate': 'AuthController.validate',
  },
  privateRoutes: {
    'POST /validateFeed': 'FeedController.validateFeed',
  },
  adminRoutes: {
    'GET /feeds': 'FeedController.getFeeds',
  },
};
module.exports = routes;

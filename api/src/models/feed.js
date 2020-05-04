'use strict';

module.exports = (sequelize, DataTypes) => {
  const feed = sequelize.define('feed', {
    camera_id: DataTypes.STRING,
    name: DataTypes.STRING,
    state: DataTypes.INTEGER,
    message: DataTypes.STRING,
    time: DataTypes.STRING,
  }, {});
  feed.associate = function(models) {
    // associations can be defined here
  };
  return feed;
};

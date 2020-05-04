'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    auth_type: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.station, {
      foreignKey: 'companyId'});
    user.hasMany(models.camera, {
      foreignKey: 'companyId'});
  };
  return user;
};

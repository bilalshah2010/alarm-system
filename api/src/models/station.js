'use strict';

module.exports = (sequelize, DataTypes) => {
  const station = sequelize.define('station', {
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
  }, {});
  station.associate = function(models) {
    // associations can be defined here
    station.belongsTo(models.user, {
      foreignKey: 'companyId'});
    station.hasMany(models.camera, {
      foreignKey: 'stationId'});
  };
  return station;
};

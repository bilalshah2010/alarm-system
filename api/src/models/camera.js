'use strict';

module.exports = (sequelize, DataTypes) => {
  const camera = sequelize.define('camera', {
    stationId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
  }, {});
  camera.associate = function(models) {
    // associations can be defined here
    camera.belongsTo(models.user, {
      foreignKey: 'companyId'});
    camera.belongsTo(models.station, {
      foreignKey: 'stationId'});
  };
  return camera;
};

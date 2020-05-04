'use strict';

const models = require('../models');
const user = models.user;
const station = models.station;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      username: 'calipsa',
      password: '1234@5678',
      type: 'monitoring-system',
      auth_type: 'jwt',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: '1 branch store',
      password: 'abcd@efgh',
      type: 'camera-station',
      auth_type: 'basic',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    const data = await user.findOne({
      where: {username: 'calipsa'},
    });

    await queryInterface.bulkInsert('stations', [{
      companyId: data.id,
      name: 'US Camera Station',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      companyId: data.id,
      name: 'UK Camera Station',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    const calipsaStations = await station.findAll({
      where: {companyId: data.id},
    });


    for (const station of calipsaStations) {
      await queryInterface.bulkInsert('cameras', [{
        companyId: station.companyId,
        stationId: station.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        companyId: station.companyId,
        stationId: station.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }

    const store = await user.findOne({
      where: {username: '1 branch store'},
    });

    return queryInterface.bulkInsert('cameras', [{
      companyId: store.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      companyId: store.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      companyId: store.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      companyId: store.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
    queryInterface.bulkDelete('stations', null, {});
    queryInterface.bulkDelete('cameras', null, {});
    return queryInterface.bulkDelete('feeds', null, {});
  },
};

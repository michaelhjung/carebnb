'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
        {
            spotId: 1,
            userId: 9,
            startDate: '2023-06-05',
            endDate: '2023-06-23'
        },
        {
            spotId: 2,
            userId: 16,
            startDate: '2022-11-01',
            endDate: '2023-11-08'
        },
        {
            spotId: 4,
            userId: 17,
            startDate: '2022-10-11',
            endDate: '2022-10-13'
        },
        {
            spotId: 7,
            userId: 4,
            startDate: '2022-10-11',
            endDate: '2022-10-13'
        },
        {
            spotId: 5,
            userId: 4,
            startDate: '2023-06-02',
            endDate: '2023-06-04'
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
        userId: {
            [Op.in]: [
                9,
                16,
                17,
                4
            ]
        }
    });
  }
};

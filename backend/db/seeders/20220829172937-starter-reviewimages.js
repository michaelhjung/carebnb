'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
        {
            reviewId: 1,
            url: 'https://bit.ly/3KrOfyi'
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
        reviewId: {
            [Op.in]: [
                1
            ]
        }
    });
  }
};

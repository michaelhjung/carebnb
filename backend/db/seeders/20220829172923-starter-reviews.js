'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
        {
            spotId: 1,
            userId: 9,
            review: 'I came here on a honeymoon with my wife! It was the best! 100% recommend!',
            stars: 5
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
        spotId: {
            [Op.in]: [
                1
            ]
        }
    });
  }
};

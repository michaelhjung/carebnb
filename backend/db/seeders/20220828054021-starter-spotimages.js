'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
        {
            spotId: 1,
            url: 'https://bit.ly/3pTsKgc',
            preview: true
        },
        {
            spotId: 1,
            url: 'https://bit.ly/3KMRY9X',
            preview: false
        },
        {
            spotId: 1,
            url: 'https://bit.ly/3cwiGqx',
            preview: false
        },
        {
            spotId: 2,
            url: 'https://bit.ly/3wG0odj',
            preview: true
        },
        {
            spotId: 3,
            url: 'https://bit.ly/3R2V5g4',
            preview: true
        },
        {
            spotId: 4,
            url: 'https://bit.ly/3Qdu0FX',
            preview: false
        },
        {
            spotId: 5,
            url: 'https://bit.ly/3Tsy0VR',
            preview: true
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
        spotId: {
            [Op.in]: [
                1,
                2,
                3,
                4,
                5
            ]
        }
    });
  }
};

'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
        {
            spotId: 1,
            userId: 9,
            review: "I came here on a honeymoon with my wife! It was the best! 100% recommend!",
            stars: 5
        },
        {
            spotId: 1,
            userId: 4,
            review: "Eh, it was ok. There weren't enough trees, but nice hot-tub!",
            stars: 3
        },
        {
            spotId: 4,
            userId: 6,
            review: "Don't come here, it's a trap!",
            stars: 1
        },
        {
            spotId: 2,
            userId: 15,
            review: "A nice, peaceful time away from all things tech and magic! Little Morgan even got to meet Santa Clause!",
            stars: 4
        },
        {
            spotId: 2,
            userId: 4,
            review: "I got lost in a blizzard! STAY AWAY!!!",
            stars: 1
        },
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

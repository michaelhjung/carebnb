'use strict';
const { Op } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
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
            {
                spotId: 4,
                userId: 4,
                review: "Some ugly looking creatures tried to steal the engagement ring I bought for my girlfriend! Don't come here!",
                stars: 1
            },
            {
                spotId: 6,
                userId: 4,
                review: "I came here to heal my pokemon and rest up, but it's not actually a pokemon center! At least the weather was nice...",
                stars: 2
            },
            {
                spotId: 7,
                userId: 9,
                review: "This place was so awesome! I LOVED IT.",
                stars: 5
            },
            {
                spotId: 7,
                userId: 5,
                review: "Pretty nice place. Might have to buy it. :)",
                stars: 5
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Reviews', {
            spotId: {
                [Op.in]: [
                    1,
                    2,
                    4,
                    6,
                    7
                ]
            }
        });
    }
};

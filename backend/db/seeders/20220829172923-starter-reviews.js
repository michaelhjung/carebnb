'use strict';
const { Op } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Reviews', [
            {
                spotId: 1,
                userId: 4,
                review: "I almost got EATEN ALIVE BY A T-REX! But... other than that it was still cool :)",
                stars: 4
            },
            {
                spotId: 1,
                userId: 9,
                review: "Came here on a honeymoon with my wife! It was AMAZING. Got to see some real-life dinosaurs! Coming back next year!",
                stars: 5
            },
            {
                spotId: 2,
                userId: 15,
                review: "Wow. Just, wow.",
                stars: 5
            },
            {
                spotId: 2,
                userId: 1,
                review: "Came here with my family, it was beautiful. Reminded me of some kind of movie I saw once...",
                stars: 5
            },
            {
                spotId: 3,
                userId: 20,
                review: "EXTREMELY EXPENSIVE, not worth the price.",
                stars: 2
            },
            {
                spotId: 4,
                userId: 10,
                review: "One of my closest friends, Dumbledore, invited me to this stupendous place. It truly was magical.",
                stars: 5
            },
            {
                spotId: 5,
                userId: 2,
                review: "My husband took me here on our honeymoon. It was wonderful :)",
                stars: 5
            },
            {
                spotId: 6,
                userId: 11,
                review: "I hate this place. Too cold.",
                stars: 1
            },
            {
                spotId: 6,
                userId: 13,
                review: "Ran into an old enemy of mine here. Made a bad place even worse",
                stars: 1
            },
            {
                spotId: 8,
                userId: 17,
                review: "Everything was very, very small. However, the hospitality was pretty good.",
                stars: 3
            },
            {
                spotId: 9,
                userId: 6,
                review: "Do NOT come here! It\'s a trap!",
                stars: 1
            },
            {
                spotId: 9,
                userId: 7,
                review: "Unless you want to get killed, please don\'t come here.",
                stars: 1
            },
            {
                spotId: 9,
                userId: 8,
                review: "I recently got engaged here, to the love of my life, my precious.",
                stars: 4
            },
            {
                spotId: 13,
                userId: 14,
                review: "Professor X was great! Loved the hospitality and mentorship here.",
                stars: 5
            },
            {
                spotId: 15,
                userId: 1,
                review: "Shadiest place ever. Mold everywhere and gates were always broken. Sometimes random homeless people would show up in my home...",
                stars: 1
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Reviews', {
            spotId: {
                [Op.in]: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    8,
                    9,
                    13,
                    15
                ]
            }
        });
    }
};

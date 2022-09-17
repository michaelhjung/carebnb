'use strict';
const { Op } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ReviewImages', [
            {
                reviewId: 1,
                url: 'https://bit.ly/3xvhuL6'
            },
            {
                reviewId: 3,
                url: 'https://bit.ly/3Bn8GYT'
            },
            {
                reviewId: 6,
                url: 'https://bit.ly/3eVzojR'
            },
            {
                reviewId: 10,
                url: 'https://bit.ly/3R6CHSV'
            },
            {
                reviewId: 11,
                url: 'https://bit.ly/3LmlMu1'
            },
            {
                reviewId: 13,
                url: 'https://bit.ly/3UveHf9'
            },
            {
                reviewId: 15,
                url: 'https://bit.ly/3BP8qU2'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ReviewImages', {
            reviewId: {
                [Op.in]: [
                    1,
                    3,
                    6,
                    10,
                    11,
                    13,
                    15
                ]
            }
        });
    }
};

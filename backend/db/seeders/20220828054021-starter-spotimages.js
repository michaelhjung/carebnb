'use strict';
const { Op } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('SpotImages', [
            {
                spotId: 1,
                url: 'https://bit.ly/3LkLsr3',
                preview: true
            },
            {
                spotId: 2,
                url: 'https://bit.ly/3xtGqTy',
                preview: true
            },
            {
                spotId: 3,
                url: 'https://bit.ly/3DG6aQa',
                preview: true
            },
            {
                spotId: 4,
                url: 'https://bit.ly/3LtWlqI',
                preview: true
            },
            {
                spotId: 5,
                url: 'https://bit.ly/3eYHGHz',
                preview: true
            },
            {
                spotId: 5,
                url: 'https://bit.ly/3KMRY9X',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://bit.ly/3cwiGqx',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://bit.ly/3UgwOoJ',
                preview: true
            },
            {
                spotId: 7,
                url: 'https://bit.ly/3qK9fae',
                preview: true
            },
            {
                spotId: 8,
                url: 'https://bit.ly/3BOD9Ra',
                preview: true
            },
            {
                spotId: 9,
                url: 'https://bit.ly/3wG0odj',
                preview: true
            },
            {
                spotId: 10,
                url: 'https://bit.ly/3R2V5g4',
                preview: true
            },
            {
                spotId: 11,
                url: 'https://bit.ly/3UgErf0',
                preview: true
            },
            {
                spotId: 12,
                url: 'https://bit.ly/3Udst5X',
                preview: true
            },
            {
                spotId: 13,
                url: 'https://bit.ly/3xw6cqf',
                preview: true
            },
            {
                spotId: 14,
                url: 'https://bit.ly/3RQJMrS',
                preview: true
            },
            {
                spotId: 15,
                url: 'https://bit.ly/3Sb7fUf',
                preview: true
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('SpotImages', {
            spotId: {
                [Op.in]: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15
                ]
            }
        });
    }
};

'use strict';
const { Op } = require("sequelize");

// helper function:
const formatDate = (date) => new Date(Date.parse(date)).toISOString().split('T')[0];

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Bookings', [
            {
                spotId: 1,
                userId: 9,
                startDate: formatDate('2023-06-05'),
                endDate: formatDate('2023-06-23')
            },
            {
                spotId: 1,
                userId: 20,
                startDate: formatDate('2023-01-01'),
                endDate: formatDate('2023-01-02')
            },
            {
                spotId: 2,
                userId: 1,
                startDate: formatDate('2023-05-09'),
                endDate: formatDate('2023-05-14')
            },
            {
                spotId: 2,
                userId: 16,
                startDate: formatDate('2022-11-01'),
                endDate: formatDate('2023-11-08')
            },
            {
                spotId: 4,
                userId: 10,
                startDate: formatDate('2022-11-20'),
                endDate: formatDate('2022-11-29')
            },
            {
                spotId: 4,
                userId: 17,
                startDate: formatDate('2022-10-11'),
                endDate: formatDate('2022-10-13')
            },
            {
                spotId: 5,
                userId: 4,
                startDate: formatDate('2023-06-02'),
                endDate: formatDate('2023-06-04')
            },
            {
                spotId: 7,
                userId: 4,
                startDate: formatDate('2022-10-11'),
                endDate: formatDate('2022-10-13')
            },
            {
                spotId: 13,
                userId: 8,
                startDate: formatDate('2023-02-14'),
                endDate: formatDate('2023-02-16')
            },
            {
                spotId: 14,
                userId: 20,
                startDate: formatDate('2022-11-15'),
                endDate: formatDate('2022-11-17')
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Bookings', {
            spotId: {
                [Op.in]: [
                    1,
                    2,
                    4,
                    5,
                    7,
                    13,
                    14
                ]
            }
        });
    }
};

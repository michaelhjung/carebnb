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
                spotId: 1,
                url: 'https://bit.ly/3Sqtvtv',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://bit.ly/3BH7KyZ',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://bit.ly/3r5tFdW',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://bit.ly/3SoLPmB',
                preview: false
            },


            {
                spotId: 2,
                url: 'https://bit.ly/3xtGqTy',
                preview: true
            },
            {
                spotId: 2,
                url: 'https://bit.ly/3C2Sbmz',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://bit.ly/3StvqxA',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://bit.ly/3xKipYn',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://bit.ly/3BD8qoP',
                preview: false
            },


            {
                spotId: 3,
                url: 'https://bit.ly/3DG6aQa',
                preview: true
            },
            {
                spotId: 3,
                url: 'https://bit.ly/3LCj3gr',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://bit.ly/3qXTTiE',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://bit.ly/3r14SrG',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://bit.ly/3E3gNgv',
                preview: false
            },


            {
                spotId: 4,
                url: 'https://bit.ly/3LtWlqI',
                preview: true
            },
            {
                spotId: 4,
                url: 'https://bit.ly/3R812Ya',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://bit.ly/3f61iK1',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://bit.ly/3xONqKH',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://bit.ly/3qYkhsD',
                preview: false
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
                spotId: 5,
                url: 'https://bit.ly/3qYjAiX',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://bit.ly/3C28srH',
                preview: false
            },


            {
                spotId: 6,
                url: 'https://bit.ly/3UgwOoJ',
                preview: true
            },
            {
                spotId: 6,
                url: 'https://bit.ly/3DMtRX5',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://bit.ly/3C1Arrr',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://bit.ly/3S4R5ML',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://bit.ly/3dyrbSm',
                preview: false
            },


            {
                spotId: 7,
                url: 'https://bit.ly/3qK9fae',
                preview: true
            },
            {
                spotId: 7,
                url: 'https://bit.ly/3r38aux',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://bit.ly/3BGufDY',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://bit.ly/3SlzHTs',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://bit.ly/3f1zTc8',
                preview: false
            },


            {
                spotId: 8,
                url: 'https://bit.ly/3BOD9Ra',
                preview: true
            },
            {
                spotId: 8,
                url: 'https://bit.ly/3R44Ppx',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://bit.ly/3UuwfIb',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://bit.ly/3BFYkU8',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://bit.ly/3SoNdFP',
                preview: false
            },



            {
                spotId: 9,
                url: 'https://bit.ly/3wG0odj',
                preview: true
            },
            {
                spotId: 9,
                url: 'https://bit.ly/3y8d915',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://bit.ly/3BFetJG',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://bit.ly/3C2RXvC',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://bit.ly/3DLO3Ze',
                preview: false
            },

            {
                spotId: 10,
                url: 'https://bit.ly/3R2V5g4',
                preview: true
            },
            {
                spotId: 10,
                url: 'https://bit.ly/3dHikhb',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://bit.ly/3qWFvau',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://bit.ly/3DUmSvg',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://bit.ly/3fd5UxT',
                preview: false
            },


            {
                spotId: 11,
                url: 'https://bit.ly/3UgErf0',
                preview: true
            },
            {
                spotId: 11,
                url: 'https://bit.ly/3feMyJ3',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://bit.ly/3R6HnIb',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://bit.ly/3qXstcG',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://bit.ly/3C4JUi4',
                preview: false
            },


            {
                spotId: 12,
                url: 'https://bit.ly/3UuTwtn',
                preview: true
            },
            {
                spotId: 12,
                url: 'https://bit.ly/3LDtUGA',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://bit.ly/3DJFNcn',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://bit.ly/3DIFhLL',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://bit.ly/3Udst5X',
                preview: false
            },


            {
                spotId: 13,
                url: 'https://bit.ly/3xw6cqf',
                preview: true
            },
            {
                spotId: 13,
                url: 'https://bit.ly/3SdAgzi',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://bit.ly/3dBEPUQ',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://bit.ly/3R5Kr7w',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://bit.ly/3LEPJG6',
                preview: false
            },


            {
                spotId: 14,
                url: 'https://bit.ly/3RQJMrS',
                preview: true
            },
            {
                spotId: 14,
                url: 'https://bit.ly/3xKiknz',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://bit.ly/3UvIUuk',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://bit.ly/3xOPDWv',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://bit.ly/3UxnexV',
                preview: false
            },


            {
                spotId: 15,
                url: 'https://bit.ly/3Sb7fUf',
                preview: true
            },
            {
                spotId: 15,
                url: 'https://bit.ly/3feDtQs',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://bit.ly/3r1FUIM',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://bit.ly/3SjmomM',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://bit.ly/3r38wBn',
                preview: false
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

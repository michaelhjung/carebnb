'use strict';
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Michael',
                lastName: 'Jung',
                email: 'michael@user.io',
                username: 'michael',
                hashedPassword: bcrypt.hashSync('ilovegrace')
            },
            {
                firstName: 'Grace',
                lastName: 'Jung',
                email: 'grace@user.io',
                username: 'grace',
                hashedPassword: bcrypt.hashSync('ilovemichael')
            },
            {
                firstName: 'Audrey',
                lastName: 'Jung',
                email: 'audrey@user.io',
                username: 'audrey',
                hashedPassword: bcrypt.hashSync('ilovedaddy')
            },
            {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'spidey@spider.man',
                username: 'friendlyspider',
                hashedPassword: bcrypt.hashSync('withgreatpower')
            },
            {
                firstName: 'Monopoly',
                lastName: 'Man',
                email: 'monopolyman@user.io',
                username: 'monopolyman',
                hashedPassword: bcrypt.hashSync('ilovemoney')
            },
            {
                firstName: 'Frodo',
                lastName: 'Baggins',
                email: 'frodobaggins@user.io',
                username: 'frodo',
                hashedPassword: bcrypt.hashSync('theringismine')
            },
            {
                firstName: 'Samwise',
                lastName: 'Gamgee',
                email: 'sam@user.io',
                username: 'samwise',
                hashedPassword: bcrypt.hashSync('friendshiprules')
            },
            {
                firstName: 'Smeagol',
                lastName: 'Trahald',
                email: 'gollum@user.io',
                username: 'gollum',
                hashedPassword: bcrypt.hashSync('myprecious')
            },
            {
                firstName: 'Aaragorn',
                lastName: 'Elessar',
                email: 'estel@user.io',
                username: 'estel',
                hashedPassword: bcrypt.hashSync('ilovearwen')
            },
            {
                firstName: 'Olorin',
                lastName: 'The Grey',
                email: 'gandalf@user.io',
                username: 'gandalf',
                hashedPassword: bcrypt.hashSync('youshallnotpass')
            },
            {
                firstName: 'Mairon',
                lastName: 'Zigur',
                email: 'sauron@user.io',
                username: 'sauron',
                hashedPassword: bcrypt.hashSync('rulemiddleearth')
            },
            {
                firstName: 'Eowyn',
                lastName: 'Rohir',
                email: 'eowyn@user.io',
                username: 'eowyn',
                hashedPassword: bcrypt.hashSync('iamnoman')
            },
            {
                firstName: 'Galadriel',
                lastName: 'Noldor',
                email: 'galadriel@user.io',
                username: 'galadriel',
                hashedPassword: bcrypt.hashSync('ladyofthelight')
            },
            {
                firstName: 'Tom',
                lastName: 'Bombadil',
                email: 'tom@user.io',
                username: 'tomthebomb',
                hashedPassword: bcrypt.hashSync('i<3goldberry')
            },
            {
                firstName: 'Pepper',
                lastName: 'Potts',
                email: 'peppotts@user.io',
                username: 'pepperpotts',
                hashedPassword: bcrypt.hashSync('tonyhasaheart')
            },
            {
                firstName: 'Cora',
                lastName: 'Joy',
                email: 'nursejoy@user.io',
                username: 'nursejoy',
                hashedPassword: bcrypt.hashSync('gottahealemall')
            },
            {
                firstName: 'T\'challa',
                lastName: 'Boseman',
                email: 'blackpanther@user.io',
                username: 'tchalla',
                hashedPassword: bcrypt.hashSync('wakandaforever')
            },
            {
                firstName: 'Stan',
                lastName: 'Lee',
                email: 'stan@user.io',
                username: 'stanlee',
                hashedPassword: bcrypt.hashSync('friends')
            },
            {
                firstName: 'Bob',
                lastName: 'Kane',
                email: 'bob@user.io',
                username: 'bobkane',
                hashedPassword: bcrypt.hashSync('batman')
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'demouser@user.io',
                username: 'demouser',
                hashedPassword: bcrypt.hashSync('password')
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        // const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users', {
            username: {
                [Op.in]: [
                    'michael',
                    'grace',
                    'audrey',
                    'friendlyspider',
                    'monopolyman',
                    'frodo',
                    'samwise',
                    'gollum',
                    'estel',
                    'gandalf',
                    'sauron',
                    'eowyn',
                    'galadriel',
                    'tomthebomb',
                    'pepperpotts',
                    'nursejoy',
                    'tchalla',
                    'stanlee',
                    'bobkane',
                    'demouser'
                ]
            }
        }, {});
    }
};

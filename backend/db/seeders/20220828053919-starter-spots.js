'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
        {
            ownerId: 5,
            address: '250, 2nd Ave, Deadman\'s Flats',
            city: 'Deadman\'s Flats',
            state: 'Alberta',
            country: 'Canada',
            lat: 51.1,
            lng: -115.26,
            name: 'Copperstone Resort',
            description: 'Very close to Banff National Park!',
            price: 145
        },
        {
            ownerId: 11,
            address: '123 NW Way',
            city: 'Gorgoroth',
            state: 'Mordor',
            country: 'Mordor',
            lat: -39.16,
            lng: 175.63,
            name: 'Barad-dur',
            description: 'Includes free heating for those cold nights! Perfect view of Mount Doom. Please remember to bring your jewelry :)',
            price: 1
        },
        {
            ownerId: 15,
            address: '200 Park Avenue',
            city: 'Manhattan',
            state: 'New York',
            country: 'Unites States',
            lat: 40.75,
            lng: -73.97,
            name: 'Avenger\'s Tower',
            description: 'Experience the life of an avenger.',
            price: 199999
        },
        {
            ownerId: 16,
            address: '350 Hawthorne Avenue',
            city: 'Oakland',
            state: 'California',
            country: 'United States',
            lat: 37.82,
            lng: -122.26,
            name: 'Pokemon Center and More - Oakland',
            description: 'Feeling sick? Heal up and rest up!',
            price: 399999
        },
        {
            ownerId: 17,
            address: '123 Wakandan Way',
            city: 'Birnin Zana',
            state: 'Wakanda',
            country: 'Wakanda',
            lat: 4.6,
            lng: 36.1,
            name: 'Wakandan Paradise House',
            description: 'Come take a vacation at one of the most secret paradises in the world!',
            price: 200000
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
        ownerId: {
            [Op.in]: [
                5,
                11,
                15,
                16
            ]
        }
    });
  }
};

'use strict';
const { Op } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Spots', [
            {
                ownerId: 1,
                address: '49 Kamehameha Hwy',
                city: 'Kaneohe',
                state: 'Hawaii',
                country: 'United States',
                lat: 21.52,
                lng: -157.84,
                name: 'Jurassic Park Cottage',
                description: 'The most amazing view you will ever see. Like Yosemite National Park and Banff on steroids, with a little extra something...',
                price: 199
            },
            {
                ownerId: 2,
                address: '1 Docter Way',
                city: 'Bolivar',
                state: 'Bolivar',
                country: 'Venezuela',
                lat: 5.97,
                lng: -62.54,
                name: 'Paradise Falls',
                description: 'The greatest vacation getaway home, ever.',
                price: 899
            },
            {
                ownerId: 3,
                address: '35 Park Place',
                city: 'Atlantic City',
                state: 'New Jersey',
                country: 'United States',
                lat: 39.36,
                lng: -74.43,
                name: 'Park Place',
                description: 'Strategically located between all the best happenings in Atlantic City!',
                price: 3500
            },
            {
                ownerId: 3,
                address: 'Bothkennar Rd',
                city: 'Falkirk',
                state: 'Scotland',
                country: 'United Kingdom',
                lat: 56.05,
                lng: -3.74,
                name: 'Hogwarts School of Witchcraft and Wizardry',
                description: 'Magical!',
                price: 599
            },
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
                ownerId: 5,
                address: '123 Elf Road',
                city: 'North Pole',
                state: 'Frigid',
                country: 'Anti-arctica',
                lat: 90,
                lng: 135,
                name: 'Santa\'s (former) House',
                description: 'A newly aquired building! Renovated with amenities including air conditioning and a new refrigerator!',
                price: 500
            },
            {
                ownerId: 5,
                address: 'Even Yisra\'el St 3',
                city: 'Jerusalem',
                state: 'Israel',
                country: 'Israel',
                lat: 31.78,
                lng: 35.22,
                name: 'The Upper Room',
                description: 'In the area? Come stay at the Upper Room for some nice time of undistracted meditation and prayer!',
                price: 30
            },
            {
                ownerId: 6,
                address: '30 Bagshot Row',
                city: 'Hobbiton',
                state: 'The Shire',
                country: 'Middle-earth',
                lat: -37.86,
                lng: -175.68,
                name: 'Bag End',
                description: 'Quaint neighborhood for a relaxing getaway!',
                price: 299
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
                description: 'Includes free heating for those cold nights! Free 24/7 security! Perfect view of Mount Doom. Please remember to bring your jewelry :)',
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
            {
                ownerId: 18,
                address: '40 Baxter Rd',
                city: 'Salem Center',
                state: 'New York',
                country: 'United States',
                lat: 41.33,
                lng: -73.57,
                name: 'Xavier\'s Mansion',
                description: 'Do you have a gift that nobody seems to appreciate? Come stay at our institute and meet other gifted people!',
                price: 50
            },
            {
                ownerId: 19,
                address: '55 Water Street',
                city: 'Gotham',
                state: 'New York',
                country: 'United States',
                lat: 40.7,
                lng: -74.01,
                name: 'Gotham Condo',
                description: 'Very close to the Gotham Police Department, very safe.',
                price: 699
            },
            {
                ownerId: 20,
                address: '2527 Dwight Way',
                city: 'Berkeley',
                state: 'California',
                country: 'United States',
                lat: 37.86,
                lng: -122.26,
                name: 'Dwight Apartments',
                description: 'Located right next to the People\'s Park!',
                price: 99
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Spots', {
            ownerId: {
                [Op.in]: [
                    1,
                    3,
                    5,
                    6,
                    11,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20
                ]
            }
        });
    }
};

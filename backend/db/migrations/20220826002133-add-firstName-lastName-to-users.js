'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'firstName', {
            type: Sequelize.STRING(30),
            allowNull: false
        });

        await queryInterface.addColumn('Users', 'lastName', {
            type: Sequelize.STRING(30),
            allowNull: false
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('Users', 'firstName');
        await queryInterface.removeColumn('Users', 'lastName');
    }
};

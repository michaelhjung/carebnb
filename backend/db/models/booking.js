'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'id', onDelete: 'CASCADE' });
      Booking.belongsTo(models.Spot, { foreignKey: 'id' , onDelete: 'CASCADE' } );
    }
  }
  Booking.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    spotId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            // double-check what date date.now checks
            // dates must not conflict with an existing booking
            isAfter: new Date(Date.now())
        }
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            // endDate must be AFTER startDate
            // dates must not conflict with an existing booking
            isAfter: this.startDate
        }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};

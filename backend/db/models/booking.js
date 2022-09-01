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
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};

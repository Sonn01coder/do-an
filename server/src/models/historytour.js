'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryTour  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoryTour.init({
    userId : DataTypes.INTEGER,
    tourId : DataTypes.INTEGER,
    dateStart: DataTypes.STRING,
    dateEnd: DataTypes.STRING,
    tickerNumber: DataTypes.INTEGER
  }, {
    sequelize, 
    modelName: 'HistoryTour',
  });
  return HistoryTour;
};
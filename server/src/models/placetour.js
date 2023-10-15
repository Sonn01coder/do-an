'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceTour  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaceTour.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    link : DataTypes.TEXT,
    geocode: DataTypes.TEXT,
  }, {
    sequelize, 
    modelName: 'PlaceTour',
  });
  return PlaceTour;
};
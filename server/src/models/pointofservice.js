'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PointOfService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PointOfService.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    villageId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    geocode:DataTypes.TEXT,
  }, {
    sequelize, 
    modelName: 'PointOfService',
  });
  return PointOfService;
};
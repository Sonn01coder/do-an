'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tours.init({
    name: DataTypes.STRING,
    placeId: DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {
    sequelize, 
    modelName: 'Tours',
  });
  return Tours;
};
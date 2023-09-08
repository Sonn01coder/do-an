'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVillages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductVillages.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    villageId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize, 
    modelName: 'ProductVillages',
  });
  return ProductVillages;
};
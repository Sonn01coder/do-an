'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Village.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.TEXT,
    history: DataTypes.TEXT,
    geocode: DataTypes.TEXT,
  }, {
    sequelize, 
    modelName: 'Village',
  });
  return Village;
};
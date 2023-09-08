'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TouristAttraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TouristAttraction.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    villageId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    geocode:DataTypes.TEXT,
  }, {
    sequelize, 
    modelName: 'TouristAttraction',
  });
  return TouristAttraction;
};
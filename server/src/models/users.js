'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.STRING,
    phone1: DataTypes.INTEGER,
    phone2: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize, 
    modelName: 'Users',
  });
  return Users;
};
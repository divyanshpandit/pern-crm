'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // FIX: Specify the exact foreign key names
      User.belongsToMany(models.Role, { 
        through: 'UserRoles', // This is the name of your junction table
        foreignKey: 'userId', // This is the column name in UserRoles
        otherKey: 'roleId'    // This is the other column name in UserRoles
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
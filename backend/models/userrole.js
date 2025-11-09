'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: true // or false if you don't need createdAt/updatedAt
  });
  return UserRole;
};
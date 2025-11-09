'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // FIX: Specify the exact foreign key names
      Role.belongsToMany(models.User, { 
        through: 'UserRoles',
        foreignKey: 'roleId',   // <-- Add this line
        otherKey: 'userId'    // <-- Add this line
      });
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
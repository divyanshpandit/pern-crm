'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lead.belongsTo(models.User, { as: 'owner', foreignKey: 'owner_id' });
      Lead.hasMany(models.Activity, { foreignKey: 'lead_id' });
      // define association here
    }
  }
  Lead.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING,
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Lead',
  });
  return Lead;
};
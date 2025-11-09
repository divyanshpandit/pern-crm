'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.belongsTo(models.Lead, { foreignKey: 'lead_id' });
      Activity.belongsTo(models.User, { foreignKey: 'user_id' });
      // define association here
    }
  }
  Activity.init({
    type: DataTypes.STRING,
    content: DataTypes.TEXT,
    lead_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Leads',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
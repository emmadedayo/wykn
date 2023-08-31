'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  });
  // user.associate = models => {
  //   user.hasMany(models.transaction, { foreignKey: 'user_id', as: 'transaction', sourceKey: 'id',});
  // }
  return user;
};
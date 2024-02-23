const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Expert = sequelize.define('Expert', {
    expertName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expertPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expertEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    expertImage: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    expertExperience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expertWorkingAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
  
  module.exports = Expert;
  
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./user');

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define the association
Blog.belongsTo(User);
User.hasMany(Blog);
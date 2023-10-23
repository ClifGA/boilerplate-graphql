const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Blog;

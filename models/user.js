// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // Ensure email addresses are unique
    allowNull: false,
    validate: {
      isEmail: true, // Validate email format
    },
  },
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;

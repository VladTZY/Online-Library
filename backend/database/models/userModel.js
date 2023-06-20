const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return User;
};

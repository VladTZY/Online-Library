const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.define(
    "book",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Book;
};
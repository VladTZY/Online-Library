const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const ShoppingCart = sequelize.define(
    "shoppingCart",
    {
      totalPrice: {
        type: Sequelize.INTEGER,
        default: 0,
      },
    },
    { timestamps: false }
  );

  return ShoppingCart;
};

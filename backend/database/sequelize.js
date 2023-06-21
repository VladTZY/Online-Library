const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const bookModel = require("./models/bookModel")(sequelize);
const userModel = require("./models/userModel")(sequelize);
const shoppingCartModel = require("./models/shoppingCart")(sequelize);

userModel.hasOne(shoppingCartModel);
shoppingCartModel.belongsToMany(bookModel, { through: "CartsBooks" });
bookModel.belongsToMany(shoppingCartModel, { through: "CartsBooks" });

module.exports = { sequelize, bookModel, userModel, shoppingCartModel };

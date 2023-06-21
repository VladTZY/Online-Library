const { bookModel } = require("../database/sequelize");

const emptyCart = async (req, res) => {
  const shoppingCart = await req.user.getShoppingCart();

  await shoppingCart.setBooks([]);
  await shoppingCart.set({
    totalPrice: 0,
  });
  await shoppingCart.save();

  res.status(200).json({ message: "Cart emptied" });
};

const getCart = async (req, res) => {
  const shoppingCart = await req.user.getShoppingCart();

  res.status(200).json({
    totalPrice: shoppingCart.totalPrice,
    books: await shoppingCart.getBooks(),
  });
};

const removeBook = async (req, res) => {
  const shoppingCart = await req.user.getShoppingCart();
  const book = await bookModel.findByPk(req.params.id);

  await shoppingCart.removeBook(book);
  await shoppingCart.set({
    totalPrice: shoppingCart.totalPrice - book.price,
  });
  shoppingCart.save();

  res.status(200).json({ message: "Book removed" });
};

module.exports = { emptyCart, getCart, removeBook };

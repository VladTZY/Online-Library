const { bookModel, shoppingCartModel } = require("../database/sequelize");

const getBooks = async (req, res) => {
  const books = await bookModel.findAll();
  res.status(200).json(books);
};

const getBook = async (req, res) => {
  const book = await bookModel.findByPk(req.params.id);
  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const book = await bookModel.create({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    price: req.body.price,
    coverFile: res.req.file.filename,
  });

  res.status(200).json(book);
};

const addBookToCart = async (req, res) => {
  const user = req.user;
  const shoppingCart = await user.getShoppingCart();
  const book = await bookModel.findByPk(req.params.id);

  await shoppingCart.addBook(book);
  await shoppingCart.set({
    totalPrice: shoppingCart.totalPrice + book.price,
  });
  await shoppingCart.save();

  res.status(200).json({ message: "Book added to cart" });
};

const deleteBook = async (req, res) => {
  await bookModel.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Entity deleted" });
};

const updateBook = async (req, res) => {
  const book = await bookModel.findByPk(req.params.id);
  book.set({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    price: req.body.price,
  });
  await book.save();

  res.status(200).json(book);
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  addBookToCart,
};

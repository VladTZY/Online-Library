const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");

const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  addBookToCart,
} = require("../controllers/booksController");

const router = express.Router();

const { requireAuth } = require("../middlewares/requireAuth");
const { requireAdmin } = require("../middlewares/requireAdmin");

router.use(requireAuth);

router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/:id/addToCart", addBookToCart);

router.use(requireAdmin);

router.post("/", upload.single("image"), createBook);

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);

module.exports = router;

const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");

const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/booksController");

const router = express.Router();

const { requireAuth } = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getBooks);

router.get("/:id", getBook);

router.post("/", upload.single("image"), createBook);

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);

module.exports = router;

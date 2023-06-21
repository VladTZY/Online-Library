const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/requireAuth");
const {
  emptyCart,
  getCart,
  removeBook,
} = require("../controllers/shoppingCartController");

router.use(requireAuth);

router.get("/", getCart);
router.post("/empty", emptyCart);
router.post("/remove/:id", removeBook);

module.exports = router;

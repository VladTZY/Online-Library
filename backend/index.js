require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./database/sequelize");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

const booksRouter = require("./routes/booksRoutes");
app.use("/api/books", booksRouter);

const shoppingCartRouter = require("./routes/shoppingCartRoutes");
app.use("/api/cart", shoppingCartRouter);

const userRouter = require("./routes/userRoutes");
app.use("/api/user", userRouter);

app.get("/ping", (req, res) => {
  res.send("pong");
});

sequelize.sync().then(() => {
  console.log("Connected to db");
  app.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
  });
});

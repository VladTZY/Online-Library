const { userModel, shoppingCartModel } = require("../database/sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "100d" });
};

const signUpUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await userModel.create({
      username: req.body.username,
      password: hash,
      role: req.body.role,
    });

    const shoppingCart = await shoppingCartModel.create({
      totalPrice: 0,
    });

    await user.setShoppingCart(shoppingCart);

    const token = createToken(user.id);

    res
      .status(200)
      .json({ username: user.username, role: user.role, token: token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) res.status(500).json({ error: "incorect password" });

    const token = createToken(user.id);

    res.status(200).json({
      username: user.username,
      role: user.role,
      token: token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  signUpUser,
  loginUser,
};

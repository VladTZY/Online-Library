const requireAdmin = (req, res, next) => {
  if (req.user.role != "ADMIN")
    return res.status(401).json({ error: "Not admin" });

  next();
};

module.exports = { requireAdmin };

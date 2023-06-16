const path = require("path");

module.exports = (file, cb) => {
  const filetypes = /jpeg|png|jpg|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  cb("please upload images only");
};

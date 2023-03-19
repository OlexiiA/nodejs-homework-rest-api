const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/users");

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ password: hashPassword, email, name });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = register;

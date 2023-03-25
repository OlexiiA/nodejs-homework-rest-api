const { Unauthorized } = require("http-errors");
const bcrypto = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/users");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypto.compareSync(password, user.password);
    if (!user || !passCompare) {
      throw new Unauthorized("Email or password is wrong");
    };
    // ===---верифікація email---===
    if(!user.verify){
      throw new Unauthorized("Email not verify");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token }); // зберігає token в базу!
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;

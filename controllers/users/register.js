const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid")

const { User } = require("../../models/users");
const {sendEmail} = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  };
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid;
  const result = await User.create({ password: hashPassword, email, avatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Registration confirmation on the website",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Push to confirm your email</a>`
  };
  await sendEmail(mail)
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
      },
    },
  });
};

module.exports = register;

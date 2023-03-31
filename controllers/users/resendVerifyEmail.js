const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models/users");
const {sendEmail} = require("../../helpers/sendEmail");

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new NotFound("User not found") 
    }
    if(user.verify){
        throw new BadRequest("Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Registration confirmation on the website",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Push to confirm your email</a>`
      };
      await sendEmail(mail);
      res.json({
        message: "Verification email sent"
      })
};

module.exports = resendVerifyEmail;
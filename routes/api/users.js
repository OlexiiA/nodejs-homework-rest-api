const express = require("express");
const { auth, validation } = require("../../middlewaress");
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/users");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrl.register);
router.post("/login", validation(joiLoginSchema), ctrl.login);
router.post("/logout", auth, ctrl.logout);

module.exports = router;

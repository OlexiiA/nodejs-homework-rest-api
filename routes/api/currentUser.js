const express = require("express");
const { currentUser: ctrl } = require("../../controllers");
const {auth} = require("../../middlewaress")

const router = express.Router();

router.get("/current", auth, ctrl.getCurrentUser);



module.exports = router;
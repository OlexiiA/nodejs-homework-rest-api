const express = require("express");
const { currentUser: ctrl } = require("../../controllers");
const { auth, upload } = require("../../middlewaress");

const router = express.Router();

router.get("/current", auth, ctrl.getCurrentUser);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;

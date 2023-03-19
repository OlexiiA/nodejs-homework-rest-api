const express = require("express");
const { auth, validation } = require("../../middlewaress");
const { joiSchema, favoriteJoiSchema } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();


router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, validation(joiSchema), ctrl.add);

router.put("/:contactId", validation(joiSchema), ctrl.updateById);

router.patch("/:contactId/favorite", validation(favoriteJoiSchema), ctrl.updateStatusContact);

router.delete("/:contactId", ctrl.removeById);

module.exports = router;

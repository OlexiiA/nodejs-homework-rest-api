const express = require("express");
const {validation} = require("../../middlewaress");
const {contactsSchema} = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

const validateMiddleware = validation(contactsSchema)
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateMiddleware, ctrl.updateById);

module.exports = router;

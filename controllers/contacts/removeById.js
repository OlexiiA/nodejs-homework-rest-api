const contactsOperation = require("../../models");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    console.log(result)
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

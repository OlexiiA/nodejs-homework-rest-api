const createError = require("http-errors");
const contactsOperation = require("../../models");

const updateById = async (req, res, next) => {
  try {
    // const { error } = contactsSchema.validate(req.body);
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }
    const { contactId } = req.params;
    const result = await contactsOperation.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
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

module.exports = updateById;

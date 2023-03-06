const contactsOperation = require("../../models");
const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    
  })
  

const add = async (req, res, next) => {
    try {
      const {error} = contactsSchema.validate(req.body);
      if(error){
        error.status = 400;
        throw error;
      }
      const result = await contactsOperation.addContact(req.body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result
        }
      })
    } catch (error) {
      next(error)
    }
  }

  module.exports = add
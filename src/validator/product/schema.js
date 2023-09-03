const Joi = require('joi');

const ProductPayloadSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().integer().required(),
  createdBy: Joi.string().required(),
});

module.exports = { ProductPayloadSchema };

const Joi = require("joi");

const invoiceValidationSchema = Joi.object().keys({
  cost: Joi.number().required(),
  concepts: Joi.array(),
  title: Joi.string(),
  user: Joi.string(),
  work: Joi.string(),
  line: Joi.string(),
  client: Joi.string(),
  salesman: Joi.string(),
  status: Joi.string(),
  OC: Joi.string().optional().allow(""),
  deliveryTime: Joi.string().optional().allow(""),
  clientId: Joi.string().required(),
  receptionNumber: Joi.string().optional().allow(""),
  remissionNumber: Joi.string().optional().allow(""),
  comissionStatus:Joi.string().optional().allow(""),
  factura: Joi.string().optional().allow(""),
  profit: Joi.number().optional().allow(""),
  comissions: Joi.number().optional().allow(""),
  expenses: Joi.number().optional().allow(""),
  email: Joi.string().optional().allow(""),
});

module.exports = invoiceValidationSchema;

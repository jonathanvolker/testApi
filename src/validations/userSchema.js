const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid("salesman", "administrator", "director", "developer")
    .required(),
  birthdate: Joi.string(),
  mainAddress: Joi.string(),
  imageLink: Joi.string(),
  addresses: Joi.string(),
  deleted: Joi.boolean(),
});

module.exports = userValidationSchema;

const Joi = require("joi");

const validateCreateOrder = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    currency: Joi.string().trim().valid("INR").required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  req.validatedBody = value;
  next();
};

const validateGeneratePaymentLink = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    currency: Joi.string().trim().valid("INR").required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  req.validatedBody = value;
  next();
};

module.exports = { validateCreateOrder, validateGeneratePaymentLink };

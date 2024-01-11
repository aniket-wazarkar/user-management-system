const Joi = require('joi');

const userSchemaValidation = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  location: Joi.string().required(),
  interests: Joi.string().required(),
  income: Joi.number().required()
});

const validationMiddleware = (req, res, next) => {
  const { error } = userSchemaValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details });
  }
  next();
};

module.exports = validationMiddleware;
const Joi = require('joi');
const User = require('../models/user');

const validate = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  location: Joi.string().required(),
  interests: Joi.array().items(Joi.string()).required(),
  income: Joi.number().required()
});

const validateUser = (req, res, next) => {
  const { error } = User.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details });
  }
  next();
};

module.exports = validateUser;
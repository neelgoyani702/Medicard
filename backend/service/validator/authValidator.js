const Joi = require("joi");


exports.AuthSignupValidator = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().min(8).max(16).required().label('Password'),
  });


// exports.AuthLoginValidator = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).max(16).required().label('Password'),});
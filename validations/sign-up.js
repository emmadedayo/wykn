const Joi = require("joi");


const signUpValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).with('password', 'repeat_password');

module.exports = {
    signUpValidation
}
const Joi = require("joi");

const billSchemeValidation = Joi.object({
    meterNo: Joi.string().required(),
    accountType: Joi.string().valid('prepaid', 'postpaid').required(),
    service: Joi.string().required(),
    amount: Joi.string().required(),
    channel: Joi.string().required(),
})
module.exports = {
    billSchemeValidation
}
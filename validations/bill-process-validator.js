import Joi  from 'joi';

const schema = Joi.object({
    customerPhoneNumber: Joi.string().required(),
    paymentMethod: Joi.string().valid('cash', 'card').required(),
    service: Joi.string().required(),
    clientReference: Joi.string().required(),
    productCode: Joi.string().required(),
    amount: Joi.string().required(),
})
export default schema;
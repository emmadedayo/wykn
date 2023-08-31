const {validationResult} = require("express-validator");


const validationMiddleWare = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(v => v.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        //get the error message from the first object in the array
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({err }));
        //get only the first error message
        const firstError = extractedErrors[0]['err']['msg'];
        res.status(400).json({ success: false, message: firstError });
    };
};

module.exports = validationMiddleWare;
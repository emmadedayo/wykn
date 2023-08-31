const { validateMeterService } = require('../services/bills-service');

const validateMeter = async (req, res) => {
    return await validateMeterService(req, (result) => {
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    validateMeter
}
const handleResponse = require("../handlers/response");
const  pouchiiModule = require("../modules/pouchii");
const {billSchemeValidation} = require("../validations/bill-params-validator");

const validateMeterService = async (data, callback) => {
    const user_id = data.userData.user['id'];
    const params = data.body;
    try {
        const options = {errors: {wrap: {label: ''}}};
        const errorDetails = billSchemeValidation.validate(data.body,options);
        if (errorDetails.error) {
            callback(handleResponse(200, true, errorDetails.error.details[0].message, ));
        }else {
            const validateMeter = await new pouchiiModule().validateMeter(params);
            console.log("validateMeter",validateMeter.data);
            if(validateMeter.data.name === " " || validateMeter.data.name === undefined || validateMeter.data.name === null){
                callback(handleResponse(400, false, "Meter not found"));
            }else{
                callback(handleResponse(200, true, "Meter fetched successfully",validateMeter.data));
            }
        }
    } catch (err) {
        console.log("Error processing your request with error: " + err)
        callback(handleResponse(500, false, "Error processing your request with error: "));
    }
}

module.exports = {
    validateMeterService
}
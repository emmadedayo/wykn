const models = require("../models");
const bcrypt = require("bcryptjs");
const handleResponse = require("../handlers/response");
const {signUpValidation} = require("../validations/sign-up");
const {signInValidation} = require("../validations/sign-in-validator");
const {generateJwtToken} = require("../helper/jwt");

const createAccountService = async (data, callback) => {
    const resource = data;
    try {
        const options = {errors: {wrap: {label: ''}}};
		const errorDetails = signUpValidation.validate(resource,options);
        if(errorDetails.error){
			callback(handleResponse(400, false, errorDetails.error.details[0].message));
		}else{
            //validate if email and phone number already exist
            const checkIfExist = await models.users.findOne({ where: { email: resource.email} });
            if(checkIfExist){
                  callback(handleResponse(400, false, "Sorry, this email or phone number is already in use"));
            }else{
                  const salt = await bcrypt.genSalt(10);
                  resource.password = await bcrypt.hash(resource.password, salt);
                  const newUser = await models.user.create(data);
                  if (newUser) {
                      callback(handleResponse(200, true, "User created successfully"));
                  } else {
                      callback(handleResponse(400, false, "Sorry, an error occurred while creating user"));
                  }
            }
        }
       }
   catch (error) {
       callback(handleResponse(500, false, "An Unknown error has occurred. Please try again later" +error));
   }
}

const loginService = async (data, callback) => {
    const resource = data;
   try {
    const options = {errors: {wrap: {label: ''}}};
    const errorDetails = signInValidation.validate(resource,options);
    if(errorDetails.error){
        callback(handleResponse(400, false, errorDetails.error.details[0].message));
    }else{
       const userCheck = await models.users.scope('withPassword').findOne({ where: { email: resource.email} });
       if (userCheck === null) {
           callback(handleResponse(400, false, "Login failed. Invalid email or password"));
       }else{
           const isValidPassword = await bcrypt.compare(resource.password, userCheck.password);
           if (!isValidPassword) {
               callback(handleResponse(400, false, "Login failed. Invalid password"));
           } else {
               const claim = {user: userCheck}
               let token;
               token = await generateJwtToken(claim, process.env.JWT_SECRET, Number(process.env.JWT_EXPIRY_TIME));
               if (token) {
                   const user_details = await models.users.findOne({
                           where: {email: resource.email.toLowerCase()}, attributes: {exclude: ['password']},
                       },
                   );
                   callback(handleResponse(200, true, "Login successful", {token, user_details}));
               } else {
                   callback(handleResponse(400, false, "Login failed"));
               }
           }
       }
    }
   }
   catch (error) {
       callback(handleResponse(500, false, "An Unknown error has occurred. Please try again later" +error));
   }
}

module.exports = {
    createAccountService,
    loginService
}
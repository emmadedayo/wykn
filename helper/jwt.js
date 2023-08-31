require("dotenv").config()

const jwt = require('jsonwebtoken');


const generateJwtToken = async (claim, secret, expTimeInSeconds) => {

    return jwt.sign(claim, secret, {expiresIn: expTimeInSeconds});
}


const validateToken =  async (token, secret) => {
    return jwt.verify(token, secret);
}

module.exports = {
    generateJwtToken,
    validateToken
};
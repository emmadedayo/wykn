const { loginService, createAccountService } = require('../services/auth-service');

const createAccount = async (req, res) => {
    return await createAccountService(req.body, (result) => {
        return res.status(result.statusCode).json(result);
    });
}

const login = async (req, res) => {
    return await loginService(req.body, (result) => {
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    createAccount,
    login
}
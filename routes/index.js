var express = require('express');
var router = express.Router();
const { checkSchema } = require('express-validator');
const { validationMiddleWare } = require('../middlewares/validation-middleware');
const authController = require('../controllers/AuthController');
const billController = require('../controllers/BillsController');
const { checkAuth } = require('../middlewares/checkAuth');

/* GET home page. */
router.all("/", (req, res) => { res.status(200).json({ "message": "Welcome chief" }) });
router.post("/signup", authController.createAccount);
router.post("/login", authController.login);
router.post("/validate-meter", checkAuth, billController.validateMeter);

module.exports = router;

var express = require('express');
var path = require('path');
const cors = require('cors');
var logger = require('morgan');

const indexRouter = require('./routes/index');


var app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', indexRouter);

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var dotenv = require('dotenv').config()
var app = express();
var appRoute = require('./routes/index')



app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", appRoute);

module.exports = app;

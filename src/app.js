const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const response = require('./lib/response');

/**
 * Controllers
 */
const greeting = require('./controllers/greeting');
const image = require('./controllers/image');

/**
 * Morgan Log
 */
logger.token('time', function getTimestamp () {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
});

/**
 * Express App
 */
const app = express();

if (process.env.APP_ENV !== 'TEST') app.use(logger(':time	:response-time ms	:status	:method	:url')); // eslint-disable-line no-tabs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());

/**
 * Router
 */
app.use('/greeting', greeting);
app.use('/image', image);

/**
 * Invalid Request Handler
 */
app.get('*', function (req, res) {
    new response.NotFound(res).send();
});

app.post('*', function (req, res) {
    new response.NotFound(res).send();
});

app.put('*', function (req, res) {
    new response.NotFound(res).send();
});

app.delete('*', function (req, res) {
    new response.NotFound(res).send();
});

module.exports = app;

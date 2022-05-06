const app = require('./src/app');
const host = '0.0.0.0';
const port = process.env.PORT || 8088;

const server = app.listen(port, host, function () {
    console.log(`[App Log] Express server listening at ${host}:${port}`);
});

module.exports = server;

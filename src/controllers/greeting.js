const router = require('express').Router();

/**
 * Global variables
 */
const RESPONSE = require('../lib/response');

router.get('/', function (req, res) {
    new RESPONSE.OK(res).send('GET custom-imgur-api / response ok');
});

module.exports = router;

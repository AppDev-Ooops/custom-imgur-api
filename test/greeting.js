const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('Greeting', function () {
    it('respond 200 - GET /greeting', function (done) {
        request(app)
            .get('/greeting')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 200);
                assert.strictEqual(res.body.status, 'ok');
                assert.strictEqual(res.body.message, 'GET custom-imgur-api / response ok');
                assert.strictEqual(res.body.data, null);
            })
            .expect(200, done);
    });
});

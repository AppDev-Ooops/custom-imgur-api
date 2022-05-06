const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('Invalid', function () {
    it('respond 404 - GET /idontexist', function (done) {
        request(app)
            .get('/idontexist')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 404);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'not found');
                assert.strictEqual(res.body.data, null);
            })
            .expect(404, done);
    });

    it('respond 404 - POST /idontexist', function (done) {
        request(app)
            .post('/idontexist')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 404);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'not found');
                assert.strictEqual(res.body.data, null);
            })
            .expect(404, done);
    });

    it('respond 404 - PUT /idontexist', function (done) {
        request(app)
            .put('/idontexist')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 404);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'not found');
                assert.strictEqual(res.body.data, null);
            })
            .expect(404, done);
    });

    it('respond 404 - DELETE /idontexist', function (done) {
        request(app)
            .delete('/idontexist')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 404);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'not found');
                assert.strictEqual(res.body.data, null);
            })
            .expect(404, done);
    });
});

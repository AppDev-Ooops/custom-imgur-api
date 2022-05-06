const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('Image', function () {
    it('respond 200 - GET /image/list', function (done) {
        request(app)
            .get('/image/list')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 200);
                assert.strictEqual(res.body.status, 'ok');
                assert.strictEqual(res.body.message, null);
                assert.strictEqual(typeof res.body.data, 'object');
                assert.strictEqual(res.body.data.constructor, Array);
            })
            .expect(200, done);
    });

    it('respond 200 - GET /image/:image', function (done) {
        request(app)
            .get('/image/test.jpg')
            .expect(function (res) {
                assert.strictEqual(Buffer.isBuffer(res.body), true);
            })
            .expect(200, done);
    });

    it('respond 404 - GET /image/:image', function (done) {
        request(app)
            .get('/image/idontexist.png')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 404);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'image idontexist.png not found');
                assert.strictEqual(res.body.data, null);
            })
            .expect(404, done);
    });

    it('respond 200 - POST /image/upload', function (done) {
        request(app)
            .post('/image/upload')
            .attach('image', 'test/assets/test.jpg')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 200);
                assert.strictEqual(res.body.status, 'ok');
                assert.strictEqual(res.body.message, null);
                assert.strictEqual(res.body.data.url.includes('http://0.0.0.0:8088/image/'), true);
            })
            .expect(200, done);
    });

    it('respond 400 - POST /image/upload (file too large)', function (done) {
        request(app)
            .post('/image/upload')
            .attach('image', 'test/assets/fileTooLarge.jpeg')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 400);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'file too large');
                assert.strictEqual(res.body.data, null);
            })
            .expect(400, done);
    });

    it('respond 400 - POST /image/upload (unexpected file name)', function (done) {
        request(app)
            .post('/image/upload')
            .attach('idontexist', 'test/assets/test.jpg')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 400);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'unexpected file');
                assert.strictEqual(res.body.data, null);
            })
            .expect(400, done);
    });

    it('respond 400 - POST /image/upload (unexpected file type)', function (done) {
        request(app)
            .post('/image/upload')
            .attach('image', 'test/assets/test.txt')
            .expect(function (res) {
                assert.strictEqual(res.body.code, 400);
                assert.strictEqual(res.body.status, 'error');
                assert.strictEqual(res.body.message, 'unexpected file');
                assert.strictEqual(res.body.data, null);
            })
            .expect(400, done);
    });
});

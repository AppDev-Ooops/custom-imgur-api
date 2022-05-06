const router = require('express').Router();

/**
 * Global variables
 */
const FS = require('fs');
const PATH = require('path');
const MULTER = require('multer');
const RESPONSE = require('../lib/response');
const FILE_TYPE = 'image';

const MULTER_UPLOAD = MULTER({
    limits: { fileSize: 10 * 1000 * 1000 }, // 10MB Limit
    storage: MULTER.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/uploads/${FILE_TYPE}`);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now().toString(36)}___${file.originalname}`);
        }
    }),
    fileFilter (req, file, cb) {
        if (['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

router.get('/list', async function (req, res) {
    const files = FS.readdirSync(PATH.join(__dirname, '/../uploads/image'));

    const images = [];
    for (const file of files) {
        if (!['.gitignore', '.DS_Store'].includes(file)) images.push(file);
    }

    new RESPONSE.OK(res).send(images);
});

router.get('/:image', async function (req, res) {
    const image = req.params.image;
    const imagePath = PATH.join(__dirname, `/../uploads/image/${image}`);

    if (FS.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        new RESPONSE.NotFound(res).send(`image ${image} not found`);
    }
});

router.post('/upload', function (req, res) {
    const upload = MULTER_UPLOAD.single(FILE_TYPE);

    upload(req, res, async function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') new RESPONSE.FileTooLarge(res).send();
            if (err.code === 'LIMIT_UNEXPECTED_FILE') new RESPONSE.UnexpectedFile(res).send();
            if (!['LIMIT_FILE_SIZE', 'LIMIT_UNEXPECTED_FILE'].includes(err.code)) new RESPONSE.UnexpectedError(res).send({ error: err });
        } else if (!req.file) {
            new RESPONSE.UnexpectedFile(res).send();
        } else {
            new RESPONSE.OK(res).send({ url: `http://0.0.0.0:${process.env.PORT || 8088}/image/${req.file.filename}` });
        }
    });
});

module.exports = router;

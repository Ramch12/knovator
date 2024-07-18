const { Router } = require('express');
const fileRoute = Router();
const { upload } = require('../service/multer');
const { parseResume } = require('../controller/file')

fileRoute.post('/file-upload', upload.single('file'), parseResume);

module.exports = fileRoute;


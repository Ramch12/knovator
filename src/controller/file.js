const { asyncWrapper } = require('../middleware/asyncWrapper');
const axios = require('axios');
const https = require('https');
const FormData = require('form-data');
const { resumeKeyMap } = require('../../key/index')

// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});
const parseResume = asyncWrapper(async (req, res) => {
    const file = req.file;
    let formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data } = await axios.post('https://aiMatching.knovator.in/success', formData, {
        headers: {
            'Content-Type': `multipart/form-data`
        },
        httpsAgent: agent
    });
    const mappedResponseObject = transformer(data)
    res.send(mappedResponseObject);
});

const transformer = (data) => {
    let mappedResponseObject = {};
    Object.entries(resumeKeyMap).forEach(([key, value]) => {
        mappedResponseObject[key] = data[value];
    });
    return mappedResponseObject;
}

module.exports = {
    parseResume
}
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbezj910j',
    api_key: '584729126328364',
    api_secret: 'JkWorEPxyPRVg8v-wXHjYPef2KI'
});

module.exports = cloudinary;
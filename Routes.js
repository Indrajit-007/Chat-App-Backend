const express = require('express')
const { authentication } = require('./controllers/authentication.js');

const router = express.Router();


router.get('/authentication', authentication);



module.exports = { router };
const express = require("express");
const { SendNewEmail } = require('../controller/email');
const router =  express.Router();


router.post('/send', SendNewEmail);


module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/client1(.html)?', (req, res) => {
    console.log('Client1 route accessed');
    res.sendFile(path.join(__dirname, '..', 'views', 'cocks', 'client1.html'));
});

router.get('/client2(.html)?', (req, res) => {
    console.log('Client2 route accessed');
    res.sendFile(path.join(__dirname, '..', 'views', 'cocks', 'client2.html'));
});

module.exports = router;

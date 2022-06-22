const express = require('express');
const api = require('../controllers/api.controllers.js');
const router = express.Router();

router.get('/c2b', api.receivePayment); //1
router.get('/b2c', api.sendPayment);
router.get('/status', api.paymentStatus);
router.get('/name', api.accountName);
router.get('/approval', api.approvalStatus);
router.get('/balance', api.getBalance);

module.exports = router
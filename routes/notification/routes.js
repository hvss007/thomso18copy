var express = require('express');
var router = express.Router();
var cors = require('cors');

// Middlewares
var TempCATokenMiddleware = require("../../middlewares/ca/temp_user/TokenMiddleware");

// Controllers
var notifControl = require('../../controllers/api/notifications/notification_controls');

// CORS Config
var corsOptions = require('../config/cors');

// Routes

// -> /notification/ca
router.post('/ca', cors(corsOptions), TempCATokenMiddleware.verify, notifControl.addCATopic);

// -> /notification/
router.post('/', cors(corsOptions), notifControl.addTopic);

module.exports = router;

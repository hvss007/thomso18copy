var express = require('express');
var router = express.Router();
var cors = require('cors');

// Controllers
var controlsRegister = require('../../controllers/api/controls/controls_register');
var controlsControl = require('../../controllers/api/controls/controls_control');
// Middlewares
var ControlsTokenMiddleware = require("../../middlewares/controls/TokenMiddleware");

// CORS Config
var corsOptions = require('../config/cors')

// Routes
router.use('/', cors(corsOptions));

// -> /api/controls/auth
router.post('/auth/login', controlsRegister.login)
router.post('/auth/register', controlsRegister.register);

// -> /api/controls/
router.get('/info', ControlsTokenMiddleware.verifyUser, controlsControl.info);
router.post('/user_info', ControlsTokenMiddleware.verifyUser, controlsControl.user_info);
router.put('/payment_update', ControlsTokenMiddleware.verifyUser, controlsControl.payment_update);


module.exports = router;
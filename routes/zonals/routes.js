var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var zonalsAdminRoutes = require('./admin/routes');

// Controllers
var zonalsControl = require('../../controllers/api/zonals/register');


// CORS Config
var corsOptions = require('../config/cors')

// Routes

// -> /zonals/admin
router.use('/admin', cors(corsOptions), zonalsAdminRoutes);

// -> /zonals
router.use('/', cors(corsOptions));

// -> /zonals/delhi
router.post('/delhi', zonalsControl.register_delhi);

// -> /zonals/chandigadh
// router.post('/chandigadh', zonalsControl.register_chandigadh);

// -> /zonals/jaipur
router.post('/jaipur', zonalsControl.register_jaipur);

// -> /zonals/lucknow
router.post('/lucknow', zonalsControl.register_lucknow);

module.exports = router;

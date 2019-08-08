var express = require('express');
var router = express.Router();
var cors = require('cors');

// Controllers
var beta_controls = require('../../controllers/api/beta/beta_controls');

// CORS Config
var corsOptions = require('../config/cors');

// Routes

// -> /beta/

// -> /beta/associate
router.post('/associate', cors(corsOptions), beta_controls.addSponsor);

module.exports = router;

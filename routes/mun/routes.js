var express = require('express');
var router = express.Router();

// Routes
var munAdminRoutes = require('./admin/routes');

// Controls
var munControls = require('../../controllers/api/mun/controls');


// Routes

// -> /mun/admin
router.use('/admin', munAdminRoutes);
router.post('/toppr', munControls.addStudent);

module.exports = router;

var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/mun/admin/admin_auth');
var adminControls = require('../../../controllers/api/mun/admin/admin_controls');

// Middlewares
var MUNAdminTokenMiddleware = require("../../../middlewares/mun/admin/TokenMiddleware");

// Routes

// -> /mun/admin/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /mun/admin
router.use('/', MUNAdminTokenMiddleware.verify);

router.get('/participants', adminControls.getParticipant);

module.exports = router;

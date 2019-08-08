var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/zonals/admin/admin_auth');
var adminControls = require('../../../controllers/api/zonals/admin/admin_controls');

// Middlewares
var ZonalsAdminTokenMiddleware = require("../../../middlewares/zonals/admin/TokenMiddleware");

// Routes

// -> /zonals/admin/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /zonals/admin
router.use('/', ZonalsAdminTokenMiddleware.verify);
router.get('/delhi', adminControls.getDelhiUsers);
router.get('/jaipur', adminControls.getJaipurUsers);
router.get('/lucknow', adminControls.getLucknowUsers);

module.exports = router;

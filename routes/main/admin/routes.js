var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/main/admin/admin_auth');
var adminControls = require('../../../controllers/api/main/admin/admin_controls');
// var eventControl  = require('../../../controllers/api/main/event_controls');

// Middlewares
var MainAdminTokenMiddleware = require("../../../middlewares/main/admin/TokenMiddleware");

// Routes

// -> /main/admin/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /main/admin
router.get('/user/:page', MainAdminTokenMiddleware.verify, adminControls.userInfo);
router.post('/addEvent', MainAdminTokenMiddleware.verify, adminControls.addEvent);
router.post('/eventUser', MainAdminTokenMiddleware.verify,adminControls.eventUser);
router.get('/fetchEvents', MainAdminTokenMiddleware.verify,adminControls.fetchEvents);
router.get('/associateFetch', MainAdminTokenMiddleware.verify,adminControls.associate_fetch);
router.get('/certificate_data', MainAdminTokenMiddleware.verify,adminControls.certificate_verify_data);
router.put('/certificate_verify', MainAdminTokenMiddleware.verify,adminControls.verify_certificate);
module.exports = router;

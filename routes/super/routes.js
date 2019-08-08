var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../controllers/api/super/admin_auth');
var adminControls = require('../../controllers/api/super/admin_controls');
var mainAdminControls = require('../../controllers/api/main/admin/admin_controls');
var coordinatorControls = require('../../controllers/api/coordinators/coordinators_register');
var controlsControls = require('../../controllers/api/controls/controls_register');

// Middlewares
var SuperAdminTokenMiddleware = require("../../middlewares/super/TokenMiddleware");

// Routes

// -> /super/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /super/
router.use('/', SuperAdminTokenMiddleware.verify);

router.get('/user/:page', mainAdminControls.userInfo);

router.get('/participant/:id', adminControls.getParticipant);
router.get('/winner', adminControls.winners);
router.get('/participanttoken/:id', adminControls.getParticipantToken);
router.get('/paid', adminControls.getPaidParticipant);
router.put('/participant/:id', adminControls.patchParticipantData);
router.post('/coordinators/register', coordinatorControls.register);

router.get('/coordinators', adminControls.getAllCoordinators);
router.get('/coordinator/:id', adminControls.getCoordinator);
router.put('/coordinator/:id', adminControls.patchCoordinator);
router.get('/coordinatortoken/:id', adminControls.getCoordinatorToken);
// -> /api/super
router.post('/controls/register', controlsControls.register);
router.put('/mediaqr', adminControls.VIP_QR);

module.exports = router;

var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/ca/admin/admin_auth');
var adminControls = require('../../../controllers/api/ca/admin/admin_controls');

// Middlewares
var CAAdminTokenMiddleware = require("../../../middlewares/ca/admin/TokenMiddleware");

// Routes

// -> /ca/admin/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /ca/admin
router.use('/', CAAdminTokenMiddleware.verify);

router.get('/participants', adminControls.getParticipant);
router.get('/score', adminControls.getScoreList);

router.get('/ideas', adminControls.getIdeas);
router.put('/idea/:id', adminControls.putIdea);
router.delete('/idea/:id', adminControls.deleteIdea);

router.put('/block/:id', adminControls.blockUser);

router.put('/bonus', adminControls.putBonus);

// -> /ca/temp/admin

router.get('/temp/participants', adminControls.getTempUsers);
router.get('/temp/score', adminControls.getTempScoreList);

router.get('/temp/ideas', adminControls.getTempIdeas);
router.put('/temp/idea/:id', adminControls.putTempIdea);
router.delete('/temp/idea/:id', adminControls.deleteTempIdea);

router.put('/temp/unverify/:id', adminControls.unverifyTempUser);

router.put('/temp/bonus', adminControls.putTempBonus);

router.get('/temp/checkoutlist', adminControls.getCheckoutList);
router.get('/temp/checkoutposts/:id', adminControls.getCheckoutPosts);

module.exports = router;

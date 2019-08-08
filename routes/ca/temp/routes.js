var express = require('express');
var router = express.Router();

// Controllers
var tempAuth = require('../../../controllers/api/ca/ca_temp_register');

var tempControls = require('../../../controllers/api/ca/ca_temp_user_controls');

// Middlewares
var TempCATokenMiddleware = require("../../../middlewares/ca/temp_user/TokenMiddleware");

// Routes

// -> /ca/temp/auth
router.post('/auth/register', tempAuth.ca_temp_register);
router.post('/auth/login', tempAuth.ca_temp_login);
router.post('/auth/verify', tempAuth.verify);
router.post('/auth/reset', TempCATokenMiddleware.verifyTemp, tempAuth.reset);

// -> /ca/temp/info
router.get('/info', TempCATokenMiddleware.verifyTemp, tempControls.getData);

// -> /ca/temp/
router.use('/', TempCATokenMiddleware.verify)
router.get('/posts', tempControls.getPosts);
router.get('/UserPosts', tempControls.getUserPosts);
router.post('/updateImage', TempCATokenMiddleware.verifyTemp, tempControls.update_image);

router.post('/idea', tempControls.postIdea);
router.get('/idea', tempControls.getIdea);
router.put('/idea/:id', tempControls.putIdea);
router.delete('/idea/:id', tempControls.deleteIdea);

router.get('/leaderboard', tempControls.getLeaderboard);
router.get('/rank', tempControls.getRank);

router.put('/fbtoken', tempControls.setFBToken);
router.get('/fbtoken', tempControls.checkToken);

router.get('/profile', tempControls.getProfile);

router.get('/fetch_certificate', TempCATokenMiddleware.verify, tempControls.fetch_certificates);

module.exports = router;

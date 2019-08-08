var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var caAdminRoutes = require('./admin/routes');
var tempCARoutes = require('./temp/routes');

// Controllers
var caAuth = require('../../controllers/api/ca/ca_auth');
var caScore = require('../../controllers/api/ca/score');
var caControls = require('../../controllers/api/ca/ca_controls');

// CORS Config
var corsOptions = require('../config/cors');

// Middleware
var CAUserTokenMiddleware = require("../../middlewares/ca/user/TokenMiddleware");

// Routes

// -> /ca/admin
router.use('/admin', cors(corsOptions), caAdminRoutes);

// -> /ca/oldscore
router.get('/oldscore', caScore.getNew);

// -> /ca/score
router.get('/score', caScore.getFinal);

// -> /ca/auth
router.post('/auth/fblogin', cors(corsOptions), caAuth.fblogin);
router.post('/auth/fbRegister', cors(corsOptions), CAUserTokenMiddleware.verify, caAuth.fbRegister);
router.get('/auth/fbData', cors(corsOptions), CAUserTokenMiddleware.verify, caAuth.getData);

// -> /ca/temp
router.use('/temp', cors(corsOptions), tempCARoutes);

// -> /ca
router.use('/', cors(corsOptions), CAUserTokenMiddleware.verify);

router.get('/posts', caControls.getPosts);
router.get('/myposts', caControls.getUserPosts);
router.post('/idea', caControls.postIdea);
router.get('/idea', caControls.getIdea);
router.put('/idea/:id', caControls.putIdea);
router.delete('/idea/:id', caControls.deleteIdea);
router.get('/leaderboard', caControls.getLeaderboard);
router.get('/rank', caControls.getRank);

module.exports = router;

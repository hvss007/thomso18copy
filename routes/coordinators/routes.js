var express = require('express');
var router = express.Router();
var cors = require('cors');

// Controllers
var coordinatorRegister = require('../../controllers/api/coordinators/coordinators_register');
var coordinatorControls = require('../../controllers/api/coordinators/coordinators_controls');
var winnerControls = require('../../controllers/api/coordinators/winner_controls');

// Middlewares
var CoordinatorsTokenMiddleware = require("../../middlewares/coordinators/TokenMiddleware");

// CORS Config
var corsOptions = require('../config/cors')

// Routes
router.use('/', cors(corsOptions));

// -> /api/coordinators/auth
router.post('/auth/register', coordinatorRegister.register);
router.post('/auth/login', coordinatorRegister.login);

// -> /api/coordinators/
router.get('/info', CoordinatorsTokenMiddleware.verifyUser, coordinatorControls.info);
router.post('/addWinner', CoordinatorsTokenMiddleware.verifyUser, winnerControls.addWinner);
router.get('/getWinner', CoordinatorsTokenMiddleware.verifyUser, winnerControls.getWinner);
router.put('/removeWinner', CoordinatorsTokenMiddleware.verifyUser, winnerControls.remove_winner);
router.post('/participants', CoordinatorsTokenMiddleware.verifyUser, coordinatorControls.participants);
router.post('/addCoCoordinator', CoordinatorsTokenMiddleware.verifyUser, coordinatorControls.addCocoordinator);
router.put('/removeCoCoordinator', CoordinatorsTokenMiddleware.verifyUser, coordinatorControls.remove_cocoordinator);
router.get('/getCoCoordinator', CoordinatorsTokenMiddleware.verifyUser, coordinatorControls.get_cocoordinator);

module.exports = router;
var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('./config/cors');
var corsMobileOptions = require('./config/corsMobile');

// Routes
var caRoutes = require('./ca/routes');
var betaRoutes = require('./beta/routes');
var notificationRoutes = require('./notification/routes');
var zonalsRoutes = require('./zonals/routes');
var mainRoutes = require('./main/routes');
var munRoutes = require('./mun/routes');
var coordinatorsRoutes = require('./coordinators/routes');
var superAdminRoutes = require('./super/routes');
var controlsRoutes = require('./controls/routes');
var mobileRoutes = require('./mobile/routes');

// Controllers
var viewController = require('../controllers/view_controller');
var verifyCerti = require('../controllers/api/Certificates/verifyCertificates');

// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/beta', betaRoutes);
router.use('/api/notification', notificationRoutes);
router.use('/api/certiVerify', cors(corsOptions), verifyCerti.certi_verify);
router.use('/api/zonals', zonalsRoutes);
router.use('/api/main', mainRoutes);
router.use('/api/mun', cors(corsOptions), munRoutes);
router.use('/api/coordinators', coordinatorsRoutes);

router.use('/api/super', cors(corsOptions), superAdminRoutes);

router.use('/api/mobile', cors(corsMobileOptions), mobileRoutes);
router.use('/api/controls', controlsRoutes);

// -> /sitemap.xml
router.get("/sitemap.xml", viewController.sitemap);
// -> /*
router.get('/*', viewController.redirectView);

module.exports = router;

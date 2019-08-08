var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var mainAdminRoutes = require('./admin/routes');

// Controllers
var eventControl = require('../../controllers/api/main/event_controls');
var participantRegister = require('../../controllers/api/main/participant_register');
var participantControl = require('../../controllers/api/main/participant_controls');

// Middlewares
var MainUserTokenMiddleware = require("../../middlewares/main/user/TokenMiddleware");

// CORS Config
var corsOptions = require('../config/cors')

// Routes
router.use('/', cors(corsOptions));

// -> /main/admin
router.use('/admin', mainAdminRoutes);

// -> /main/auth
router.post('/auth/register', participantRegister.participant_registration);
router.post('/auth/verify', MainUserTokenMiddleware.verifyUser, participantRegister.verifyOTP);
router.get('/auth/resend', MainUserTokenMiddleware.verifyUser, participantControl.resendOTP);
router.post('/auth/login', participantRegister.participant_login);


// -> /main/resetPassword
router.post('/auth/resetEmail', participantRegister.reset_password_email);
router.post('/auth/resetPassword', participantRegister.reset_password);


// -> /main/
router.get('/user', MainUserTokenMiddleware.verifyUser, participantControl.userInfo);
router.get('/primary', eventControl.getEvents);
router.get('/events', MainUserTokenMiddleware.verify, participantControl.getUserEvents);
router.post('/updateImage', MainUserTokenMiddleware.verify, participantControl.update_image);
router.post('/getImage', MainUserTokenMiddleware.verify, participantControl.get_image);

router.post('/ticktok_username', MainUserTokenMiddleware.verify, participantControl.ticktok_username);
router.get('/fetch_certificate_participant', MainUserTokenMiddleware.verify, participantControl.fetch_certificates_participant);
router.get('/fetch_certificate_winner', MainUserTokenMiddleware.verify, participantControl.fetch_certificates_winner);

router.delete('/removeEvent', MainUserTokenMiddleware.verify, eventControl.removeEvent);

router.post('/addParticipant', MainUserTokenMiddleware.verify, eventControl.addParticipant);
router.post('/removeParticipant', MainUserTokenMiddleware.verify, eventControl.removeParticipant);

router.post('/answerMUN', MainUserTokenMiddleware.verify, participantControl.munAnswer);
router.post('/certiVerifyParticipant', participantControl.certificate_verifications_participant);
router.post('/certiVerifyWinner', participantControl.certificate_verifications_winner);



module.exports = router;
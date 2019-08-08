var MUNAnswers = require('../../../../models/mun/MUN_Answer');

/* GET ALL Users */
exports.getParticipant = function (req, res) {
    MUNAnswers.find()
        .populate('user', 'thomso_id name')
        .select('answerOne answerTwo answerThree')
        .exec(function (err, allUsers) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to GET Participants', error: err });
            res.json(allUsers);
        });
};

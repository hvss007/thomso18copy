var Main_User = require('../../../models/main/Main_User');
var EventSchema = require('../../../models/main/Thomso_Event');

exports.getEvents = function (req, res) {
    if (req) {
        EventSchema.find({ isPrimary: true })
            .select('name')
            .sort({ name: 1 })
            .exec(function (err, result) {
                console.log(err);
                // console.log(result);
                if (err) return res.status(400).send({ success: false, msg: 'Unable to fetch event' });
                if (result) res.json({ success: true, msg: 'event fetched', body: result });
                else return res.status(400).send({ success: false, msg: 'Unable to fetch event' });
            });
    }
    else return res.status(400).send({ success: false, msg: 'Invalid Request' });
};

exports.removeEvent = function (req, res) {
    if (req && req.body) {
        if (req.body.event_id) req.body.event_id = req.body.event_id.trim();

        if (req.body.event_id) {
            EventSchema.remove({ event_id: req.body.event_id })
                .exec(function (err) {
                    if (err) return res.status(400).send({ success: false, msg: 'unable to delete event' });
                    res.json({ success: true, msg: 'event deleted' });
                });
        } else return res.status(400).send({ success: false, msg: 'Invalid Event ID' });
    } else return res.status(400).send({ success: false, msg: 'Invalid Data' });
};

exports.addParticipant = function (req, res) {
    if (req && req.body) {
        var updateData = {
            event_id: req.body.event_id,
            email: req.locals.email
        };
        if (updateData.event_id) {
            EventSchema.findOneAndUpdate(
                { event_id: req.body.event_id },
                { $addToSet: { users: req.locals._id } }
            )
                .exec(function (err, result) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Unable to add participant' });
                    }
                    if (result) {
                        Main_User.update(
                            { email: updateData.email },
                            { $addToSet: { event: result._id } }
                        )
                            .exec(function (err) {
                                if (err) {
                                    return res.status(400).send({ success: false, msg: 'Unable to add event' });
                                }
                                res.json({ success: true, msg: 'Event added in participant' });
                            });
                    } else {
                        return res.status(400).send({ success: false, msg: 'No such event Exists' });
                    }
                });
        } else {
            return res.status(400).send({ success: false, msg: 'Event ID Not Found' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
}

exports.removeParticipant = function (req, res) {
    if (req && req.body) {
        var data = {
            event_id: req.body.event_id,
            email: req.locals.email,
            _id: req.locals._id
        }
        if (data.event_id && data.email && data._id) {
            Main_User.findOne({
                email: data.email
            })
                .select('name primary_event')
                .exec(function (err, user) {
                    if (err) {
                        return res.state(400).send({ success: false, msg: 'unable to remove participant' });
                    }
                    if (!user) {
                        return res.state(400).send({ success: false, msg: 'Email Not Found' });
                    }
                    else {
                        EventSchema.findOne({ _id: user.primary_event })
                            .select('name event_id')
                            .exec(function (err, results) {
                                if (err) {
                                    return res.state(400).send({ success: false, msg: 'unable to remove participant' });
                                }
                                if (results && results.event_id === data.event_id) {
                                    return res.json({ success: false, msg: "Primary Event Can't be deleted" });
                                }
                                else {
                                    EventSchema.findOneAndUpdate({ event_id: data.event_id }, { $pull: { users: data._id } })
                                        .select('name')
                                        .exec(function (err, result) {
                                            if (err) {
                                                return res.state(400).send({ success: false, msg: 'unable to remove participant' });
                                            }
                                            Main_User.findOneAndUpdate(
                                                { email: data.email },
                                                { $pull: { event: result._id } }
                                            )
                                                .exec(function (err) {
                                                    if (err) return res.status(400).send({ success: false, msg: 'unable to remove event' });
                                                    res.json({ success: true, msg: 'event removes from participant' });
                                                });
                                        });
                                }
                            })
                    }
                })
        } else return res.status(400).send({ success: false, msg: 'Invalid Event ID' });
    } else return res.status(400).send({ success: false, msg: 'Invalid Data' });
}
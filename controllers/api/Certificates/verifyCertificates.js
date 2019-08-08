var registration_user = require('../../../models/Certificate/registration_user');
var winner_list = require('../../../models/Certificate/winner_list');
var ca_certi = require('../../../models/Certificate/ca_certi');
var ca_form = require('../../../models/Certificate/ca_form');

exports.certi_verify = (res, req) => {
    if(req.req.body && req.req.body.table === 'registration_user'){
        registration_user.findOne({
            id: req.req.body.id
        })
        .select('id name contact college')
        .exec(function(err, user) {
            if (err) {
                return res.json({ status: 400, error: true,err: err  });
            }
            else if (!user) {
                return res.res.json({ status:200,success:false});
            } else {
                if (user) {
                    res.res.json({ status: 200,success: true, data: user })
                }
            }
        });
    }
    else if(req.req.body && req.req.body.table === 'winner_list'){
        let params = req.req.body.id.split('_');
        winner_list.findOne({
            id: params[0],
            coordi_id: params[2]
        })
        .select('thomso_id name contact position event_name')
        .exec(function(err, user) {
            if (err) {
                return res.json({ status: 400, error: true, err: err });
            }
            else if (!user) {
                return res.res.json({ status:200, success:false });
            } else {
                if (user) {
                    res.res.json({status: 200, success: true,  data: user})
                }
            }
        });
    }

    else if(req.req.body && req.req.body.table === 'ca'){
        ca_form.findOne({
            id: req.req.body.id
        })
        .select('id name contact college email fb_id')
        .exec(function(err, user) {
            if (err) {
                return res.json({status: 400, error: true, err: err  });
            }
            else if (!user) {
                return res.res.json({status:200,success:false});
            } else {
                if (user) {
                    ca_certi.findOne({
                        mobile: user.contact
                    })
                    .select('mobile')
                    .exec(function(err, user2) {
                        if (err) {
                            return res.json({status: 400,error: true,err: err});
                        }
                        else if (!user2) {
                            return res.res.json({status:200,success:false});
                        } else {
                            if (user2) {
                                res.res.json({status: 200,success: true,data: user})
                            }
                        }
                    });
                }
            }
       });
    }
}

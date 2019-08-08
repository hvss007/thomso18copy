// var moment = require('moment');
// var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
// var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var Winner_List = require('../../../models/coordinators/Winner_List');
var Main_User = require('../../../models/main/Main_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
// var TokenHelper = require('../../../helpers/TokenHelper');
// var Generator = require("../../../helpers/GeneratePassword");

exports.addWinner = (req, res) => {
    if(req.body && req.body.account_holder_name && req.body.thomso_id && req.body.event_name && req.body.position && req.body.account_no && req.body.bank_name && req.body.ifsc_code && req.locals.email){
        console.log(req.body.thomso_id,'1')
        if (req.body.thomso_id) {
            req.body.thomso_id = req.body.thomso_id.trim();
        }
        if (req.body.event_name) {
            req.body.event_name = req.body.event_name.trim();
        }
        if (req.body.account_holder_name) {
            req.body.account_holder_name = req.body.account_holder_name.trim();
        }
        if (req.body.position) {
            req.body.position = req.body.position.trim();
        }
        if (req.body.account_no) {
            req.body.account_no = req.body.account_no.trim();
        }
        if (req.body.ifsc_code) {
            req.body.ifsc_code = req.body.ifsc_code.trim();
        }
        if (req.body.bank_name) {
            req.body.bank_name = req.body.bank_name.trim();
        }

        if(req.body.thomso_id){
            console.log(req.body.thomso_id,'2')
            Main_User.findOne({thomso_id:req.body.thomso_id})
            .select('name college email contact blocked paymant_type')
            .exec( (errr, result) => {
                if(errr) return res.status(400).send({success:false, msg:"winner data not found"})
                else if(!result) return res.json({success:false, msg:"Incorrect Thomso ID"});
                else if(result.blocked) return res.json({success:false, msg:"User is blocked"});
                else{
                    var data = {
                        thomso_id:req.body.thomso_id,
                        event_name:req.body.event_name,
                        position:req.body.position,
                        account_no:req.body.account_no,
                        ifsc_code:req.body.ifsc_code,
                        bank_name:req.body.bank_name,
                        coordinator_email:req.locals.email,
                        college:result.college,
                        name:result.name,
                        email:result.email,
                        contact:result.contact,
                        account_holder_name:req.body.account_holder_name,
                        event_name_email:req.body.event_name + result.email
                    }
                    var newUser = new Winner_List(data);
                    newUser.save( function(err){
                        if(err) {
                            return res.status(400).send({success:false, msg:"Something Went Wrong1"})
                        }
                        Counter.findByIdAndUpdate({ _id: 'winners_count' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error) {
                            if(error) {return res.status(400).send({success:false, msg:"unable to add count"})}
                                res.json({ success: true, msg: 'Successfully Registered' });
                        })
                    } )
                }
                
            }) 
        }
        else{
            return res.status(400).send({success:false, msg:"Something Went Wrong2"})
        }
    } else{
       return res.status(400).send({success:false, msg:"Something Went Wrong3"})
    }       
}

exports.getWinner = (req, res) => {
    if(req.body && req.locals.email){
        if(req.locals.email === 'prashantverma1223@gmail.com' || req.locals.email === 'pra@gmail.com'){
            Winner_List.find()
            .exec( (err, result) => {
                if(err) return res.status(400).send({success: false, msg:"No Data"});
                res.json({success:true, body:result, msg:"Fetched Successfully!!"})
            } )
        }
        else{
            Winner_List.find({ coordinator_email: req.locals.email })
            .exec( (err, result) => {
                if(err) return res.status(400).send({success: false, msg:"No Data"});
                res.json({success:true, body:result, msg:"Fetched Successfully!!"})
            } )
        }
    }else return res.status(400).send({msg:"Invalid Data", success:false})
}

exports.remove_winner = (req, res) => {
    // console.log(req.body, req.locals)
    if(req.body && req.locals.email &&  req.body.id){
        Winner_List.findOneAndUpdate({_id:req.body.id}, {verified:false})
        .select('_id name')
        .exec( (err, result)=> {
            if(err) return res.state(400).send({success:false, msg:"User not found"})
            res.json({success:true, msg:"Successfully removed"})
        })
    }else return res.status(400).send({msg:"Invalid Data", success:false})
}


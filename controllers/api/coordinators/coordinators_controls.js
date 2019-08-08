// var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
// var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var CoCOordiantor_List = require('../../../models/coordinators/CoCoordinator_User');
// var Main_User = require('../../../models/main/Main_User');
// var Counter = require('../../../models/counters/Counter');
var EventSchema = require('../../../models/main/Thomso_Event');
// var TokenHelper = require('../../../helpers/TokenHelper');
// var Generator = require("../../../helpers/GeneratePassword");

exports.info = function(req, res) {
    if(req && req.locals && req.locals.email){
        Coordinators_User.findOne({email: req.locals.email})
        .select(' name email event_id')
        .exec( (err, result) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"});
            else if(!result) return res.status(400).send({success:false, msg:"no user found"});
            res.json({success:true, body:result, msg:"User Found"});
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"});
}

exports.participants = function(req, res) {
    if(req.body && req.body.event_id && req.locals && req.locals.email){
        EventSchema.findOne({event_id: req.body.event_id})
        .populate('users', 'thomso_id college name email contact gender payment_type blocked')
        .select(' name ')
        .exec( (err, result) => {
            if(err){ 
                return res.status(400).send({success:false, msg:"Event ID wrong"});
            }
            else if(!result) return res.json({success:false, msg:"No participants"});
            res.json({success:true, msg:"User fetched", body:result});
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"});
}

exports.addCocoordinator = (req, res) => {
    if(req.body && req.locals.email&& req.body.name && req.body.enrollment_no && req.body.email && req.body.bhawan && req.body.branch && req.body.year && req.body.event_id && req.body.gender && req.body.contact){
        console.log(req.body.name,'1')
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.trim();
        }
        if (req.body.enrollment_no) {
            req.body.enrollment_no = req.body.enrollment_no.trim();
        }
        if (req.body.bhawan) {
            req.body.bhawan = req.body.bhawan.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.year) {
            req.body.year = req.body.year.trim();
        }
        if (req.body.event_id) {
            req.body.event_id = req.body.event_id.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (req.body.gender) {
            req.body.gender = req.body.gender.trim();
        }

        if(req.body && req.body.name){
            console.log(req.body.name,'2')
            var data = {
                name:req.body.name,
                email:req.body.email,
                gender:req.body.gender,
                branch:req.body.branch,
                year:req.body.year,
                bhawan:req.body.bhawan,
                contact:req.body.contact,
                event_id:req.body.event_id,
                enrollment_no:req.body.enrollment_no,
                coordinator_email:req.locals.email   
            }
            var newUser = new CoCOordiantor_List(data);
            newUser.save( function(err){
                if(err) {
                    return res.status(400).send({success:false, msg:"Something Went Wrong1"})
                }
                res.json({ success: true, msg: 'Successfully Registered' });
            })
        }       
    }
    else return res.status(400).send({success:false, msg:"Invalid Request"})
}

exports.get_cocoordinator = (req, res) => {
    if(req.body && req.locals.email){
        if(req.locals.email === 'prashantverma1223@gmail.com' || req.locals.email === 'pra@gmail.com'){
            CoCOordiantor_List.find()
            .exec( (err, result) => {
                if(err) return res.status(400).send({success: false, msg:"No Data"});
                res.json({success:true, body:result, msg:"Fetched Successfully!!"})
            } )
        }
        else{
            CoCOordiantor_List.find({ coordinator_email: req.locals.email })
            .exec( (err, result) => {
                if(err) return res.status(400).send({success: false, msg:"No Data"});
                res.json({success:true, body:result, msg:"Fetched Successfully!!"})
            } )
        }
    }else return res.status(400).send({msg:"Invalid Data", success:false})
}

exports.remove_cocoordinator = (req, res) => {
    // console.log(req.body, req.locals)
    if(req.body && req.locals.email &&  req.body.id){
       CoCOordiantor_List.findOneAndUpdate({_id:req.body.id}, {blocked:true})
        .select('_id name')
        .exec( (err)=> {
            if(err) return res.state(400).send({success:false, msg:"User not found"})
            res.json({success:true, msg:"Successfully removed"})
        })
    }else return res.status(400).send({msg:"Invalid Data", success:false})
}
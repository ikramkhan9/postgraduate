let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let Student = require('../models/student.model');

route.get('/:id', (req, res, next) => {
    //console.log('Ok');  
    //res.send(req.params.id);

    let studentid = req.params.id.toString();
    console.log(studentid);
    
    let mbbsdata = [];
    Student.findById(studentid).exec().then(
        doc => {
            res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));

});

route.post('/:id', (req, res, next) => {
    //console.log('Ok');  
    //res.send(req.params.id);

    let studentid = req.params.id.toString();
    console.log(studentid);
    
    //let mbbsdata = [];
    Student.update({_id: studentid}, {$set: {sname: req.body.txtsname, 
        fname: req.body.txtfname,
        email: req.body.txtemail,
        mobile: req.body.txtmobile,
        doj: req.body.txtdoj,
        dor: req.body.txtdor,
        cnic: req.body.txtcnic,
        do_birth: req.body.txtdob,
        cmsid: req.body.txtcmsid,
        nationality: req.body.txtnationality,
        pmdc_no: req.body.txtpmdc,
        rtmc_no: req.body.txtrtmc,
        gender: req.body.cmbgender,
        depart_id: req.body.cmbdepart,
        supervisor_id: req.body.cmbsupervisor,
        address: req.body.txtaddress,
        dis_action: req.body.txtdisciplinary,
        med_board: req.body.txtmedboard,
        domicile: req.body.txtdomicile,
        account_no: req.body.txtaccount_no,
        govt: req.body.cmbgovt,
        ispresent: req.body.cmbpresent,        
        religion: req.body.cmbreligion,
        remarks: req.body.txtremarks,        
    
    }})
        .exec()
        .then(
        doc => {
            res.json(doc);            
            console.log('Update :', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));

});


module.exports = route
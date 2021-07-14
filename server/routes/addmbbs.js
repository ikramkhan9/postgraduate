let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let Student = require('../models/student.model');

route.get('/', (req, res, next) => {
    console.log('Add MBBS');
    res.send('Please submit form');


    //res.render('index');
    /*let mbbsdata = [];
    Student.find().exec().then(
        doc => {            
            console.log('STUDENT', doc)
            res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));
        */
        //console.log('STUDENT DATA ' ,mbbsdata);

    //res.render('mbbsall_dmc', {studentdata : mbbsdata});

    //res.render('mbbsall_dmc');

});

route.post('/', (req, res, next) => {
    //console.log(req.body.txtsname);
    //console.log(req.body.txtaddress);

    const studentData = new Student({
        sname: req.body.txtsname,
        fname: req.body.txtfname,
        email: req.body.txtemail,
        mobile: req.body.txtmobile,       
        doj: req.body.txtdoj,
        dor: req.body.txtdor,
        domicile: req.body.txtdomicile,
        account_no: req.body.txtaccount_no,       
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
        govt: req.body.cmbgovt,
        ispresent: req.body.cmbpresent,
        dis_action: req.body.txtdisciplinary,
        med_board: req.body.txtmedboard, 
        remarks: req.body.txtremarks,
        religion: req.body.cmbreligion,       
        
    });

    studentData.save().then(doc => {
        console.log(doc);
        
    }).catch(err => console.log(err));    
    
    res.json({ message: 'Student Posted'});

});

module.exports = route
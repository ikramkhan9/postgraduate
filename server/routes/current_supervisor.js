let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let FCPS = require('../models/student.model');
let Fcps_Supevisor = require('../models/fcps_supervisor.modal');


route.get('/', (req, res, next) => {
    //res.render('index');
    //let mbbsdata = [];
    //Student.find().populate({ path: 'ward', select: 'classname' }).exec().then(
        //FCPS.find({'ispresent': 'COMPLETED'}).sort({'depart_id': 1, 'supervisor_id':1 }).populate('depart_id', 'ward_name').populate('supervisor_id', 'super_name').exec().then(  
        Fcps_Supevisor.find({}).sort({'depart_id': 1}).populate('depart_id', 'ward_name').exec().then(      
        doc => {
            //console.log(doc);
            if(doc.length >= 0){
                res.json(doc);
            }
            else {
                res.json({ message: 'No data found' });
            }
            //res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }
    ).catch(err => console.log(err));
});


/*
route.get('/:id', (req, res, next) => {
    //res.render('index');
    let studentid = req.params.id;

    let mbbsdata = [];
    Student.findById(studentid).exec().then(
        doc => {
            res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));
});
*/

module.exports = route
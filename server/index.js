const express = require('express')
const app = express();

var bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pg', { useNewUrlParser: true });

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next();
});


// Load Routes
const loginRoute = require('./routes/login');
const studentRoute = require('./routes/student');
const addMBBSRoute = require('./routes/addmbbs');
const editStudent = require('./routes/editstudent');
//const feesRoute = require('./routes/fees');
const fcpsWardRoute = require('./routes/fcps_ward');
const fcpsSupervisorRoute = require('./routes/fcps_supervisor');
const departSupervisor = require('./routes/depart_supervisor');
const currentPgReport = require('./routes/currten_pg_report');
const current_Supervisor = require('./routes/current_supervisor');
const supervisor_Wise_Total = require('./routes/supervisor_wise_report');
const no_present = require('./routes/no_present');
const yearWiseReport = require('./routes/year_wise_report');



//const editFeeRoute = require('./routes/editfee');

// app.get('/' (req, res) => {
//     console.log('ge request');
//     res.send('get req');
// })

// All Routes
app.use('/', loginRoute);
app.use('/mbbspresent', studentRoute);
app.use('/addmbbs', addMBBSRoute);
app.use('/editstudent', editStudent);
//app.use('/fees', feesRoute);
app.use('/fcpsward', fcpsWardRoute);
app.use('/fcps_supervisor', fcpsSupervisorRoute);
app.use('/depart_supervisor', departSupervisor);
app.use('/current_report', currentPgReport);
app.use('/current_supervisors', current_Supervisor);
app.use('/supervisor_wise_total', supervisor_Wise_Total);
app.use('/nopresent', no_present);
app.use('/yearwise_report', yearWiseReport);


//app.use('/editfee', editFeeRoute);

//var qr = require('qr-image');
//app.get('/qrcode', (req,res) => {

    /*
   var qr_svg = qr.image('5a9a9a0903d62618e0b869e9', { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.png'));
 
var svg_string = qr.imageSync('5a9a9a0903d62618e0b869e9', { type: 'png' });

    res.send(svg_string);
*/
  //  res.send('QR Code');
//})

/*
let FCPS = require('./models/student.model');

app.post('/qrcode', (req,res) => {
    //console.log('QR Code Inserted');
     //res.send('QR Code Inserted');

     console.log('request body', req.body.txtqrcode);
    //console.log(req.body.txtaddress);

    FCPS.update({_id: '5a9a9a0903d62618e0b869e9'}, function(req, res, err){
        if(err){
            res.send(err);
        }
        else{
            Student.update({},
            {$push:{'qrcode': [{atten_in: '2010-05-09', atten_out: '2018-01-09', status:'Present'}]}},
        function(err, model){
            if(err){
                console.log('update err', err);
            }
            console.log('update model', model);
        });
        }
    })
    res.json({ message: 'QR Posted'});
 })



app.post('/users', (req, res) => {
    console.log('Post Ok');
    //res.redirect('/users');
    //res.json({ messge: 'Yes'});
});
*/




app.listen(3001, () => console.log('Example app listening on port 3001!'))
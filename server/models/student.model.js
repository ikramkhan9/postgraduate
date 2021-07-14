let mongoose = require('mongoose');

let attendanceScheme = mongoose.Schema({
    present: Number,
    leave: Number,
    absent: Number,
    createdOn: {type: Date, default: Date.now},
    status: String
});

let feeScheme = mongoose.Schema({
    yearof: String,
    amount: Number,
    createdOn: {type: Date, default: Date.now},    
    status: String
});

/*
let departScheme = mongoose.Schema({
    monthof: String,
    amount: Number,
    createdOn: {type: Date, default: Date.now()},
    paydate: Date,
    status: String
});

let feeScheme = mongoose.Schema({
    monthof: String,
    amount: Number,
    createdOn: {type: Date, default: Date.now()},
    paydate: Date,
    status: String
});
*/

let fcpsSchema = mongoose.Schema({
    sname: {type: String},
    fname: String,
    email: String,
    mobile: String,
    doj: Date,
    dor: Date,
    domicile: String,
    account_no: String,
    cnic: String,
    do_birth: Date,
    cmsid: String,    
    nationality: String,
    pmdc_no: String,
    rtmc_no: String,
    gender: String,
    depart_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Fcpsward'},
    supervisor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Fcpssupervisor'}, 
    address: String,    
    govt: String,
    ispresent: String,
    dis_action: String,
    med_board: String,    
    createdOn: {type: Date, default: Date.now},
    updatedOn: Date,
    remarks: String,
    religion: String,
    qrcode : [attendanceScheme],    
    fees: [feeScheme]
});

let FCPS = mongoose.model('Fcps', fcpsSchema);
module.exports = FCPS;

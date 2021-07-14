let mongoose = require('mongoose');

let departSchema = mongoose.Schema({
    ward_name: String,    
    createdOn: {type: Date, default: Date.now()},
    ispresent: String
});

let Fcps_Depart = mongoose.model('Fcpsward', departSchema);
module.exports = Fcps_Depart;

let mongoose = require('mongoose');

let fcps_supervisorSchema = mongoose.Schema({
    super_name: String,
    createdOn: {type: Date, default: Date.now()},
    ispresent: String,
    depart_id: String,
    email: String,
    mobile: String,
    depart_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Fcpsward'}
});

let Fcps_Supevisor = mongoose.model('Fcpssupervisor', fcps_supervisorSchema);
module.exports = Fcps_Supevisor;

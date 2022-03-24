const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const patientFollowUpSchema = new Schema({
	doctorId: {
		type: String,
	},
	patientId: {
		type: String,
	},

});

const Patient = mongoose.model('Patient', patientFollowUpSchema);

module.exports = Patient;

const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const patientFollowUpSchema = new Schema({
	doctorId: {
		type: Number,
	},
	patientId: {
		type: Number,
	},

});

const Patient = mongoose.model('Patient', patientFollowUpSchema);

module.exports = Patient;

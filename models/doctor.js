const mongoose = require("mongoose");
const Patient = require("./patientFollowUp");
const  Schema  = mongoose.Schema;

const doctorSchema = new Schema({
	doctorName: {
		type: String,
	},
	speciality: {
		type: String,
	},
	sexe: {
		type: String,
	},
	city: {
		type: String,
	},
	patients: [{type: Number}],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

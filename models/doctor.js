const mongoose = require("mongoose");
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
	patients: [{idPatient: Number, namePatient: String}],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

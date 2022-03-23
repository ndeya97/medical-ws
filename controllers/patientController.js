const Patient = require('../models/patientFollowUp');

// AddPatient
async function addPatient(body) {
	const patient = new Patient(body);

	try {
		const newPatient = await patient.save();
		return {
			success: true,
			data: newPatient,
		};
	} catch (err) {
		return { success: false, message: "Failed to add patient" };
	}
}



module.exports = {
	addPatient
}

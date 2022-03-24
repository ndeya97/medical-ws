const Patient = require('../models/patientFollowUp');
const Doctor = require('../models/doctor');

// Add Patient Follow Up 
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

//Get All Patient Follow up
function getAllPatients (req,res) {
	Patient.find()
	.then(patients => {
		res.send(patients);
		console.log(patients);
	}).catch (err => {
		res.status(500).send({
			message: err.message || "Patient not found"
	});
  });	
}



// Update doctor patients list
async function updatePatientsList(id, patients = null) {
	let doctor;
	let patientList = Patient.getAllPatients();
	try {
		doctor = await Doctor.findById(id);
		if (doctor == null) {
			return { success: false, message: 'Cannot find doctor' };
		}
		if (patients != null) {
			patientList.forEach(patient => {
				if(patient.doctorId == doctor._id)
				doctor.patients = doctor.patients.push(patient)
			});
			console.log(doctor)
		}

		try {
			const updatedDoctor = await doctor.save()
			return {
				success: true,
				data: updatedDoctor,
				message: "Doctor updated successfully"
			};
		} catch (err) {
			return { sucess: false ,message: "Failed to update doctor" };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}
}

module.exports = {
	addPatient,
	getAllPatients,
	updatePatientsList
}

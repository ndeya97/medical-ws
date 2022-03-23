const Doctor = require('../models/doctor');

 function getAllDoctors (req,res) {
	Doctor.find()
	.then(doctors => {
		res.send(doctors);
		console.log(doctors);
	}).catch (err => {
		res.status(500).send({
			message: err.message || "Doctors not found"
	});
  });	
}

async function getDoctorById(id) {
	let doctor;
	try {
		doctor = await Doctor.findById(id);
		if (doctor == null) {
			return { success: false, message: 'Cannot find doctor' };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}

	return {
		success: true,
		data: doctor,
	};
}

// AddDoctor
async function addDoctor(body) {
	const doctor = new Doctor(body);

	try {
		const newDoctor = await doctor.save();
		return {
			success: true,
			data: newDoctor,
		};
	} catch (err) {
		return { success: false, message: "Failed to add doctor" };
	}
}

async function updateDoctor(id, doctorName = null, speciality = null, sexe = null, city = null) {
	let doctor;
	try {
		doctor = await Doctor.findById(id);
		if (doctor == null) {
			return { success: false, message: 'Cannot find doctor' };
		}
		if (doctorName != null) {
			doctor.doctorName = doctorName
		}
		if (speciality != null) {
			doctor.speciality = speciality
		}
		if (sexe != null) {
			doctor.sexe = sexe
		}
		if (city != null) {
			doctor.city = city
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

async function removeDoctor(id) {
	let doctor;
	try {
		doctor = await Doctor.findById(id);
		if (doctor == null) {
			return { success: false, message: 'Cannot find doctor' };
		}

		try {
			await doctor.remove()
			return {
				success: true,
				message: 'Deleted Doctor'
			};
		} catch (err) {
			return { success: false ,message: err.message };
		}
	} catch (err) {
		return { success: false, message: err.message };
	}
}



module.exports = {
	getAllDoctors,
	getDoctorById,
	addDoctor,
	updateDoctor,
	removeDoctor
}

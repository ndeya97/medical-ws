const Doctor = require('../models/doctor');

async function getAllDoctors(search, reqPage, reqLimit) {
	let options = {};

	if (search) {
		options = {
			...options,
			$or: [
				{doctorName: new RegExp(search.toString(), 'i')},
				{speciality: new RegExp(search.toString(), 'i')}
			]
		}
	}

	let total = Doctor.countDocuments(options);
	let page = parseInt(reqPage) || 1;
	let limit = parseInt(reqLimit) || parseInt(await total);
	let last_page = Math.ceil(parseInt(await total)/limit);
	if (last_page < 1 && total > 0) {
		last_page = 1
	}

	try {
		const doctor = await Doctor.find(options).skip((page - 1) * limit).limit(limit);
		return {
			success: true,
			data: doctor,
			total: (await total).toString(),
			page: (await page).toString(),
			last_page: (await last_page).toString(),
		};
	} catch (err) {
		return { success: false, message: "Doctors not found" };
	}
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

async function updateDoctor(id, doctorName = null, speciality = null, sexe = null) {
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

const express = require('express');
const router = express.Router();
let { getAllPatients, addPatient, updatePatientsList } = require('../controllers/patientController')


/**
 * @swagger
 * /patients:
 *   get:
 *     description: All patients
 *     responses:
 *       200:
 *         description: Returns all the patients
 */
 router.get('/', async (req, res) => {
	let response = await getAllPatients(req,res);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /patients:
 *   post:
 *     parameters:
 *      - in: body
 *        name: patient
 *        description: New patient follow up
 *        schema:
 *          type: object
 *          properties:
 *            patientId:
 *              type: string
 *            doctorId:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
	let body = {
		patientId: req.body.patientId,
		doctorId: req.body.doctorId,
	};
	let response = await addPatient(body);

	if (response.success == true) {
		res.status(201).json(response);
		console.log(response);
	} else {
		res.status(404).json(response);
		console.log(response);

	}
});

/**
 * @swagger
 * /doctors/{id}/patients:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The doctor ID.
 *      - in: body
 *        name: doctor
 *        description: Update doctor
 *        schema:
 *          type: object
 *          properties:
 *            doctorName:
 *              type: string
 *            speciality:
 *              type: string
 *            sexe:
 *              type: string
 *            city:
 *              type: string
 *           type: object
 *           propreties:
 *              patientId:
 *                type: string
 *              doctorId:
 *                type: string
 *     responses:
 *       201:
 *         description: Created
 */
 router.put('/:id/patients', async (req, res) => {
	let patients = null ;
	if (req.body.patients) {patients = req.body.patientId}
	
	let response = await updatePatientsList(req.params.id, patients);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;

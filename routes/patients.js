const express = require('express');
const router = express.Router();
let { addPatient, updatePatientsList } = require('../controllers/patientController')


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
 *              type: Number
 *            doctorId:
 *              type: Number
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
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The patient ID.
 *      - in: body
 *        name: patient
 *        description: Update patient
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
 *            patients:
 * 				type: array
 *     responses:
 *       201:
 *         description: Created
 */
 router.put('/:id', async (req, res) => {
	let patients;
	if (req.body.patients) {patients = req.body.patients}

	let response = await updatePatientsList(req.params.id, patienst);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

module.exports = router;

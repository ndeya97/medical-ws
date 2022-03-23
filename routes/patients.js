const express = require('express');
const router = express.Router();
let { addPatient } = require('../controllers/patientController')


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


module.exports = router;

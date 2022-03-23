const express = require('express');
const router = express.Router();
let { getAllDoctors, getDoctorById, addDoctor, updateDoctor, removeDoctor } = require('../controllers/doctorController')

/**
 * @swagger
 * /doctors:
 *   get:
 *     description: All doctors
 *     responses:
 *       200:
 *         description: Returns all the doctors
 */
router.get('/', async (req, res) => {
	let response = await getAllDoctors(req.query.s, req.query.page, req.query.limit);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The doctor ID.
 *     description: Get a doctor by id
 *     responses:
 *       200:
 *         description: Returns the requested doctor
 */
router.get('/:id', async (req, res) => {
	let response = await getDoctorById(req.params.id);
	res.json(response);
});

/**
 * @swagger
 * /doctors:
 *   post:
 *     parameters:
 *      - in: body
 *        name: doctor
 *        description: New doctor
 *        schema:
 *          type: object
 *          properties:
 *            doctorName:
 *              type: string
 *            speciality:
 *              type: string
 *            sexe:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
	let body = {
		doctorName: req.body.doctorName,
		speciality: req.body.speciality,
		sexe: req.body.sexe,
	};
	let response = await addDoctor(body);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /doctors/{id}:
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
 *     responses:
 *       201:
 *         description: Created
 */
router.put('/:id', async (req, res) => {
	let doctorName = null, speciality = null, sexe = null;
	if (req.body.doctorName) {doctorName = req.body.doctorName}
	if (req.body.speciality) {speciality = req.body.speciality}
	if (req.body.sexe) {sexe = req.body.sexe}
	let response = await updateDoctor(req.params.id, doctorName, speciality, sexe);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The doctor ID.
 *     description: Delete a doctor by id
 *     responses:
 *       200:
 *         description: Returns the requested doctor
 */
router.delete('/:id', async (req, res) => {
	let response = await removeDoctor(req.params.id)
	try {
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(response);
	}
});

module.exports = router;

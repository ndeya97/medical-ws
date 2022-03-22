const express = require('express');
const router = express.Router();
let { getAllDoctors, getDoctorById, addDoctor, updateDoctor, removeDoctor } = require('../controllers/doctorController')


router.get('/', async (req, res) => {
    let response = await getAllDoctors(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


router.get('/:doctorId', async (req, res) => {
    let response = await getDoctorById(req.params.doctorId);
    res.json(response);
});


router.post('/', async (req, res) => {
    let body = {
        doctorId: req.body.doctorId,
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


router.put('/:doctorId', async (req, res) => {
    let doctorName = null, speciality = null, sexe = null;
    if (req.body.doctorName) {doctorName = req.body.doctorName}
    if (req.body.speciality) {speciality = req.body.speciality}
    if (req.body.sexe) {sexe = req.body.sexe}
    let response = await updateCatchphrase(req.params.doctorId, doctorName, speciality, sexe);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});


router.delete('/:doctorId', async (req, res) => {
    let response = await removeDoctor(req.params.id)
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = router;
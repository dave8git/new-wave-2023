const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);

router.get('/seat/:id', SeatController.getById);

router.post('/seats', SeatController.post);

router.delete('/seats/:id', SeatController.delete);

module.exports = router; 




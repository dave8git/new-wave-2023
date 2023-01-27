const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concert/:id', ConcertController.getById);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

module.exports = router; 
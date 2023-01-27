const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/seats', TestimonialController.getAll);

router.get('/seat/:id', TestimonialController.getById);

router.post('/seats', TestimonialController.post);

router.put('/seats', TestimonialController.put);

router.delete('/seats/:id', TestimonialController.delete);

module.exports = router;
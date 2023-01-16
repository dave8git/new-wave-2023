const express = require('express');
const db = require('../db');
const router = express.Router();
const uuid = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) =>{
    res.json(db.seats.find((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const item = {
        id: uuid.v4(),
        day: req.body.day || 'unknown',
        seat: req.body.seat || '',
        client: req.body.client,
        email: req.body.email,
    }
    db.seats.push(item),
    res.json({message: 'ok'});
});

router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.filter((item) => item.id != req.params.id);
    res.json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
    const elem = db.seats.find((item) => item.id == req.params.id);
    elem.performer = req.body.performer;
    elem.seat = req.body.seat;
    elem.client = req.body.client;
    elem.email = req.body.email;
    db.seats = db.seats.map((item) => item.id == req.params.id ? elem : item);
    res.json({message: 'ok'});
});

module.exports = router;
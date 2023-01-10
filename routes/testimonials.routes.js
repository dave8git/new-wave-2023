const express = require('express');
const db = require('../db');
const router = express.Router();
const uuid = require('uuid');

// GET /testimonials – zwracanie całej listy wpisów.
router.route('/testimonials').get((req, res) => { 
    res.json(db.testimonials);
});

// GET /testimonials/random – zwracanie losowego wpisu.
router.route('/testimonials/random').get((req, res) => {
    const ansreq = db.testimonials[Math.floor(Math.random()* db.testimonials.length)];
    console.log(ansreq);
    res.json(ansreq);
});

// GET /testimonials/:id – zwracanie konkretnego wpisu.
router.route('/testimonials/:id').get((req, res) => {  
    res.json(db.testimonials.find((item) => item.id == req.params.id)); // tu lepsze jest find, ponieważ jest szybsze (niż filter)
});

// POST /testimonials – dodawanie nowego wpisu na bazie req.body, otrzymanego od części frontendowej.
router.route('/testimonials').post((req, res) => {
    // author, text, id (uuid)
    const item = {
        id: uuid.v4(),
        author: req.body.author || 'unknown',
        text: req.body.text || '', 
    }
    db.testimonials.push(item),
    res.json({message: 'ok'});

});

// PUT /testimonials/:id – modyfikacja wpisu o danym id na bazie req.body otrzymanego od części frontendowej.
router.route('/testimonials/:id').put((req, res) => {
    // req.params.id
    const elem = db.testimonials.find((item) => item.id == req.params.id);
    elem.author = req.body.author; // zmienia obiekt przez referencję
    elem.text = req.body.text;
    db.testimonials = db.testimonials.map((item) => item.id == req.params.id ? elem : item );
    res.json({message: 'ok'});
});

// DELETE /testimonials/:id – usunięcie wpisu o konkretnym id.
router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials = db.testimonials.filter((item) => item.id != req.params.id);
    res.json({message: 'OK'});
});

module.exports = router;
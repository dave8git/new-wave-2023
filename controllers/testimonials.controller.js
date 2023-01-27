const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Testimonial.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found'});
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => { 
    try {
        const dep = await Testimonial.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Nt found' });
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.post = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author: author, text: text });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.put = async (req, res) => {
    const { author, text } = req.body;
    try { 
        const dep = await Testimonial.findById(req.params.id);
        if (dep) {
            await Testimonial.updateOne(
                { _id: req.params.id }, 
                { $set: { author, text }}
            );
            const newDep = await Testimonial.findById(req.params.id);
            res.json(newDep);
        } elseres.status(404).json({ message: 'Not found..' }); 
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const dep = await Testimonial.findById(req.params.id);
        if(dep) {
            await Testimonial.remove(dep);
            res.json({ message: 'OK', dep})
        } else res.status(404).json({ message: 'Not found'});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// const express = require('express');
// const db = require('../db');
// const router = express.Router();
// const uuid = require('uuid');

// // GET /testimonials – zwracanie całej listy wpisów.
// router.route('/testimonials').get((req, res) => { 
//     res.json(db.testimonials);
// });

// // GET /testimonials/random – zwracanie losowego wpisu.
// router.route('/testimonials/random').get((req, res) => {
//     const ansreq = db.testimonials[Math.floor(Math.random()* db.testimonials.length)];
//     console.log(ansreq);
//     res.json(ansreq);
// });

// // GET /testimonials/:id – zwracanie konkretnego wpisu.
// router.route('/testimonials/:id').get((req, res) => {  
//     res.json(db.testimonials.find((item) => item.id == req.params.id)); // tu lepsze jest find, ponieważ jest szybsze (niż filter)
// });

// // POST /testimonials – dodawanie nowego wpisu na bazie req.body, otrzymanego od części frontendowej.
// router.route('/testimonials').post((req, res) => {
//     // author, text, id (uuid)
//     const item = {
//         id: uuid.v4(),
//         author: req.body.author || 'unknown',
//         text: req.body.text || '', 
//     }
//     db.testimonials.push(item),
//     res.json({message: 'ok'});

// });

// // PUT /testimonials/:id – modyfikacja wpisu o danym id na bazie req.body otrzymanego od części frontendowej.
// router.route('/testimonials/:id').put((req, res) => {
//     // req.params.id
//     const elem = db.testimonials.find((item) => item.id == req.params.id);
//     elem.author = req.body.author; // zmienia obiekt przez referencję
//     elem.text = req.body.text;
//     db.testimonials = db.testimonials.map((item) => item.id == req.params.id ? elem : item );
//     res.json({message: 'ok'});
// });

// // DELETE /testimonials/:id – usunięcie wpisu o konkretnym id.
// router.route('/testimonials/:id').delete((req, res) => {
//     db.testimonials = db.testimonials.filter((item) => item.id != req.params.id);
//     res.json({message: 'OK'});
// });

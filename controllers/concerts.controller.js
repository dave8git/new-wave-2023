const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found'});
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.post = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ 
            performer: performer,
            genre: genre, 
            price: price, 
            day: day, 
            image: image,
        });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};



exports.put = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const dep = await Concert.findById(req.params.id);
        if(dep) {
            await Concert.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        performer: performer,
                        genre: genre, 
                        price: price,
                        day: day,
                        image: image,
                    }
                }
            );
            const depNewValue = await Concert.findById(req.params.id);
            res.json({dep, depNewValue});
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
    
};

//---//


// const express = require('express');
// const db = require('../db');
// const router = express.Router();
// const uuid = require('uuid');

// router.route('/concerts').get((req, res) => {
//     res.json(db.concerts);
// });

// router.route('/concerts/:id').get((req, res) =>{
//     res.json(db.concerts.find((item) => item.id == req.params.id));
// });

// router.route('/concerts').post((req, res) => {
//     const item = {
//         id: uuid.v4(),
//         performer: req.body.author || 'unknown',
//         genre: req.body.genre || '',
//         price: req.body.price,
//         day: req.body.day,
//         image: req.body.image,
//     }
//     db.concerts.push(item),
//     res.json({message: 'ok'});
// });

// router.route('/concerts/:id').delete((req, res) => {
//     db.concerts = db.concerts.filter((item) => item.id != req.params.id);
//     res.json({message: 'OK'});
// });

// router.route('/concerts/:id').put((req, res) => {
//     const elem = db.concerts.find((item) => item.id == req.params.id);
//     elem.performer = req.body.performer;
//     elem.genre = req.body.genre;
//     elem.price = req.body.price;
//     elem.day = req.body.day;
//     elem.image = req.body.image;
//     db.concerts = db.concerts.map((item) => item.id == req.params.id ? elem : item);
//     res.json({message: 'ok'});
// });

// module.exports = router;
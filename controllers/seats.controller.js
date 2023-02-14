const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const dep = await Seat.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not Found..'});
        else res.json(dep);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.post = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({
            day: sanitize(day),
            seat: sanitize(seat),
            client: sanitize(client),
            email: sanitize(email),

        });
        await newSeat.save();
        res.json({ message: 'OK' });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const dep = await Seat.findById(req.params.id);
        if (dep) {
            await Seat.remove(dep);
            res.json({ message: 'OK', dep });
        } else res.status(404).json({ message: 'Not found..' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}




// const uuid = require('uuid');

// router.route('/seats').get((req, res) => {
//     res.json(db.seats);
// });

// router.route('/seats/:id').get((req, res) =>{
//     res.json(db.seats.find((item) => item.id == req.params.id));
// });

// router.route('/seats').post((req, res) => {
//     const item = {
//         id: uuid.v4(),
//         day: req.body.day || 'unknown',
//         seat: req.body.seat || '',
//         client: req.body.client,
//         email: req.body.email,
//     }
//     console.log(req.body.day);
//     console.log(req.body.seat);
//     console.log(req.body.seats)
//     const foundSeat = db.seats.some((elem) => elem.seat === req.body.seat && elem.day === req.body.day);
//     console.log(foundSeat);
//     if(!foundSeat) {
//         db.seats.push(item);
//         res.json({message: 'ok'});
//         req.io.emit('seatsUpdated', db.seats);
//     } else {
//         return res.status(404).json({ message: "Miejsce zajęte"});
//     }
// });

// router.route('/seats/:id').delete((req, res) => {
//     db.seats = db.seats.filter((item) => item.id != req.params.id);
//     res.json({message: 'OK'});
// });

// router.route('/seats/:id').put((req, res) => {
//     const elem = db.seats.find((item) => item.id == req.params.id);
//     elem.performer = req.body.performer;
//     elem.seat = req.body.seat;
//     elem.client = req.body.client;
//     elem.email = req.body.email;
//     db.seats = db.seats.map((item) => item.id == req.params.id ? elem : item);
//     res.json({message: 'ok'});
// });

// module.exports = router;
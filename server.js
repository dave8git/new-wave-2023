const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express(); 
//const db = require('./db');
const cors = require('cors');
const socket = require('socket.io');
//const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
  });
app.use('/api', testimonials); // add post routes to server
app.use('/api', concerts);
app.use('/api', seats);

app.use(express.static(path.join(__dirname, '/client/build')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json('404');
});

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000')
});

const io = socket(server);

io.on('connection', (_socket) => { // to nie jest socket który importujemy na początku pliku 
    console.log('New Socket!');
});


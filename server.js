const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express(); 
const db = require('./db');
const cors = require('cors');

const testimonials = require('./routes/testimonials.routes');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonials); // add post routes to server

app.use((req, res) => {
    res.status(404).json('404');
});



app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
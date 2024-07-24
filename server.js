// IMPORTED MODULES

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

// DATABASE

require('./config/database.js');

// MODELS

// CONTROLLERS

// MIDDLEWARE

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// ROUTES

app.get('/', (req, res) => {
    res.send('This is working');
})

app.listen('3000');


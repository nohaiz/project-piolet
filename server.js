// IMPORTED MODULES

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const authContoller = require('./controllers/auth.js');
const session = require('express-session');

// DATABASE

require('./config/database.js');

// MODELS

// CONTROLLERS

// MIDDLEWARE

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// ROUTES

app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.use('/auth', authContoller);

app.listen('3000');


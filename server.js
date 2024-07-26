// IMPORTED MODULES

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

// DATABASE

require('./config/database.js');

// MODELS

// CONTROLLERS
const authContoller = require('./controllers/auth.js');


// MIDDLEWARE

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// CUSTOM MIDDLEWARE
const {passUser} = require('./middlewares/auth.js');

// LOCAL SESSION CREATED
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// GLOBAL LOCAL VAR
app.use(passUser);

// ROUTES

app.get('/', (req, res) => {

    res.render('index.ejs');
})
app.use('/auth', authContoller);

app.listen('3000');


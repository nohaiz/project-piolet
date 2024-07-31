// IMPORTED MODULES

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path')

// DATABASE

require('./config/database.js');

// MODELS

// CONTROLLERS
const authContoller = require('./controllers/auth.js');
const projectController = require('./controllers/projects/projectRoute.js');
const listController = require('./controllers/lists/listRoute.js');

// PORT

const port = process.env.PORT ? process.env.PORT : '3000';


// MIDDLEWARE

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// STYLE SHEET ROUTE/MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')))


// CUSTOM MIDDLEWARE
const {passUser} = require('./middlewares/auth.js');
const {managePartials} = require('./middlewares/project.js');

// LOCAL SESSION CREATED
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// GLOBAL LOCAL VAR
app.use(passUser);
app.use(managePartials);

// ROUTES

app.get('/', managePartials, (req, res) => {

    res.render('index.ejs');
})

// USING MIDDLEWARE FOR OTHER ROUTES
app.use('/users/:usersId',listController);
app.use('/users/:usersId/projects', projectController);
app.use('/auth', authContoller);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
// IMPORTED MODULES

const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');

// MODEL

const User = require('../models/user.js');

// MIDDLEWARE

const resetError = (req, res, next) => {
    res.locals.userTaken = '';
    res.locals.passBad = '';
    next();
}

// ROUTES

router.get('/sign-up', resetError,(req, res) => {
    res.render('auth/sign-up.ejs');
})

router.post('/sign-up', resetError, async (req, res) => {
    try {
        const userInDatabase = await User.findOne({username: req.body.username})
    if (userInDatabase) {
        const username = 'Username already taken.'
        return res.render('auth/sign-up.ejs', {userTaken: username, passBad: ''})
    }
    if (req.body.password !== req.body.confirmPassword) {
        const password = 'Password and Confirm password must match.'
        return res.render('auth/sign-up.ejs', {userTaken: '', passBad: password})
    }
    const hashedPassword = bycrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
    req.body.password = hashedPassword;

    const payLoad= {
        username: req.body.username,
        password: hashedPassword,
        userType: 'admin'
    }
    const user = await User.create(payLoad);

    req.session.user = {
        username: user.username,
        _id: user._id,
    };

    req.session.save(()=> {
        res.redirect('/');
    })

    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
})

module.exports = router;
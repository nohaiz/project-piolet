// IMPORTED MODULES

const express = require('express');
const router = express.Router();

// MODELS

const User = require('../../models/user.js');
const Project = require('../../models/user.js'); 

// CONTROLLERS

const projectCtrl =  require('./projectController.js');

// ROUTES

router.get('/new', projectCtrl.newProject);

module.exports = router;


// IMPORTED MODULES

const express = require('express');
const router = express.Router();

// MODELS

const User = require('../../models/user.js');
const Project = require('../../models/user.js'); 

// CONTROLLERS

const projectCtrl =  require('./projectController.js');


// ROUTES

router.get('/', projectCtrl.indexProject);

router.get('/new', projectCtrl.newProject);

router.get('/:projectId', projectCtrl.showProject);

router.delete('/:projectId', projectCtrl.deleteProject);

router.get('/:projectId/edit', projectCtrl.editProject);

router.post('/', projectCtrl.createProject);

module.exports = router;


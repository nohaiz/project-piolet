// IMPORTED MODULES

const express = require('express');
const router = express.Router();

// CONTROLLERS

const projectCtrl =  require('./projectController.js');

// ROUTES

router.get('/', projectCtrl.indexProject);

router.get('/new', projectCtrl.newProject);

router.get('/:projectId', projectCtrl.showProject);

router.delete('/:projectId', projectCtrl.deleteProject);

router.get('/:projectId/edit', projectCtrl.editProject);

router.put('/:projectId', projectCtrl.updateProject);

router.post('/', projectCtrl.createProject);

module.exports = router;


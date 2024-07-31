// IMPORTED MODULES

const express = require('express');
const router = express.Router();


// CONTROLLERS

const listController = require('../lists/listController.js');

// ROUTES


router.get('/projects/:projectId/lists/new',listController.newList);


router.delete('/projects/:projectId/lists/:listId', listController.deleteList);

router.get('/projects/:projectId/lists/:listId/edit', listController.editList);

router.put('/projects/:projectId/lists/:listId', listController.updateList);

router.post('/projects/:projectId/lists', listController.createList);

module.exports = router;
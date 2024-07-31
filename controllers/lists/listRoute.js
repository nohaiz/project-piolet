// IMPORTED MODULES

const express = require('express');
const router = express.Router();


// CONTROLLERS

const listController = require('../lists/listController.js');

// ROUTES

// router.get('/', listController.indexList);

router.get('/projects/:projectId/lists/new',listController.newList);

// router.get('/:listId', listController.showList);

router.delete('/projects/:projectId/lists/:listId', listController.deleteList);

// router.get('/:listId/edit', listController.editList);

// router.put('/:listId', listController.updateList);

router.post('/projects/:projectId/lists', listController.createList);

module.exports = router;
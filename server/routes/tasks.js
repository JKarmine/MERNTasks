const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verify = require('../middleware/auth');
const { check } = require('express-validator');

// Create task
// api/tasks
router.post('/',
    verify,
    [
        check('name', 'Name is required').not().isEmpty()
    ],    
    taskController.createTask
);

// Get tasks by project
router.get('/',
    verify,
    taskController.getTasks
);

// Update a task
router.put('/:id',
    verify,
    taskController.updateTask
);

// Delete a task
router.delete('/:id',
    verify,
    taskController.deleteTask
);

module.exports = router;
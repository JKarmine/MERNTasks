const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verify = require('../middleware/auth');
const { check } = require('express-validator');

// Create project
// api/projects
router.post('/',
    verify,
    [
        check('name', 'Name is required').not().isEmpty()
    ],
    projectController.createProject
);

router.get('/',
    verify,
    projectController.getProjects
);

module.exports = router;
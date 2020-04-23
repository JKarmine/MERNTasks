const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verify = require('../middleware/auth');

// Create project
// api/projects
router.post('/',
    verify,
    projectController.createProject
);

router.get('/',
    verify,
    projectController.createProject
);

module.exports = router;
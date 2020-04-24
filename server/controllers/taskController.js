const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator')

// Create a new task

exports.createTask = async (req, res) => {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verify if project exists
        console.log(req.body);
        const { project } = req.body;

        const projectExists = await Project.findById(project);
        if (!projectExists) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Verify project creator
        if (projectExists.creator.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not Allowed' });
        }

        // Create task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}
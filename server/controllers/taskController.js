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

// Get tasks by project
exports.getTasks = async (req, res) => {
    try {
        // Verify if project exists
        const { project } = req.query;

        const projectExists = await Project.findById(project);
        if (!projectExists) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Verify project creator
        if (projectExists.creator.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not Allowed' });
        }

        // Get tasks
        const tasks = await Task.find({ project });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

// Update a task
exports.updateTask = async (req, res) => {
    try {
        // Verify if project exists
        const { project, name, state } = req.body;

        // If task exists
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Extract project
        const projectExists = await Project.findById(project);

        // Verify project creator
        if (projectExists.creator.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not Allowed' });
        }

        // Create object with the new info
        const newTask = {};

        if (name) newTask.name = name;
        if (state) newTask.state = state;
        
        // Save task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });

        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        // Verify if project exists
        const { project } = req.query;

        // If task exists
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Extract project
        const projectExists = await Project.findById(project);

        // Verify project creator
        if (projectExists.creator.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not Allowed' });
        }

        // Delete
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Task Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}
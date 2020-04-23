const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    // Check errors
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create new project
        const project = new Project(req.body);

        // Save creator through JWT
        project.creator = req.user;

        // Save project
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        // Check ID
        let project = await Project.findById(req.params.id);

        // If project exists
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Verify project creator
        if (project.creator.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not Allowed' });
        }

        // Update
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor.');
    }
}
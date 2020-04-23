const Project = require('../models/Project');

exports.createProject = async (req, res) => {
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
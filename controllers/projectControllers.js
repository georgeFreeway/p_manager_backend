const Project = require('../models/projectModel');
const mongoose = require('mongoose');

//get all project
module.exports.getProjects = async (req, res) => {
    try{
        const projects = await Project.find({});
        res.status(200).json(projects);
    }catch(error){
        res.status(401).json({ error: error.message });
    }
    
}

//get single project
module.exports.getSingleProject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json({ error: 'id is not valid' });
    }

    try{
        const singleProject = await Project.findById({ _id: id });
        if(!singleProject){
            return res.status(401).json({ error: 'no project found!' });
        }
        res.status(200).json(singleProject);
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}

//create a project
module.exports.createProject = async (req, res) => {
    const { name, details, dueDate, category, assignedUsers, comment, createdBy } = req.body;

    try{
        const project = await Project.create({ name, details, dueDate, category, assignedUsers, comment, createdBy });
        res.status(200).json(project);
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}

//update project
module.exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const commentToAdd = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json({ error: 'id is not valid' });
    }

    try{
        const update = await Project.updateOne({ _id: id}, { $push: { comment: commentToAdd }});
        res.status(200).json(update);
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}

//deleteProject
module.exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json({ error: 'id is not valid' });
    }

    try{
        await Project.deleteOne({ _id: id });
        res.status(200).json({ message: "Project deleted successfully "});
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}
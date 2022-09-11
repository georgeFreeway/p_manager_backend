const express = require('express');
const controllers = require('../controllers/projectControllers');

//init project router
const projectRoutes = express.Router();

//routes
projectRoutes.get('/getprojects', controllers.getProjects);
projectRoutes.get('/getprojects/:id', controllers.getSingleProject);
projectRoutes.post('/postprojects', controllers.createProject);
projectRoutes.patch('/projects/:id', controllers.updateProject);
projectRoutes.delete('/projects/:id', controllers.deleteProject);

module.exports = projectRoutes;


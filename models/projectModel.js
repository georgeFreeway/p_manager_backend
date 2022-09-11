const { Schema, model } = require('mongoose');

//structure the projects
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
   dueDate: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
   assignedUsers: {
        type: Array,
        required: true
    },
    comment: {
        type: Array
    },
    createdBy: {
        type: Object,
        required: true
    }
}, { timestamps: true });

//create project model
const Project = model('project', projectSchema);

module.exports = Project;
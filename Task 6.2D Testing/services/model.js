const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
});
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
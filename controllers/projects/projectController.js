// MODELS

const Project = require('../../models/project.js');

const newProject = (req, res, next) => {
    const isNewLinkClicked = true;
    res.render('index.ejs',{isNewLinkClicked});
}

module.exports = {
    newProject,
}
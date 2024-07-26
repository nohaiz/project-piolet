// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newProject = (req, res, next) => {
    const isNewLinkClicked = true;
    res.render('index.ejs',{isNewLinkClicked});
}

const createProject = async (req, res) => {
    try {
        const payLoad = {
            title : req.body.title,
            creator: req.session.user._id
        }
        const project = await Project.create(payLoad);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newProject,
    createProject,
}
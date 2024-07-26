// MODELS

const { render } = require('ejs');
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

const indexProject = async (req, res) => {
    try {
        const isShowing = true;
        const userProjs = await Project.find({creator : req.session.user._id});
        res.render('index.ejs', {userProjs, isShowing});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newProject,
    createProject,
    indexProject,
}
// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newProject =  (req, res, next) => {
    const isNewLinkClicked = true;
    res.render('index.ejs',{isNewLinkClicked});
}

const createProject = async (req, res) => {
    try {
        const payLoad = {
            title: req.body.title,
            creator: req.session.user._id,
            dueDate : req.body.dueDate,
            assignedUsers: []
        };

        if (Array.isArray(req.body.user)) {
            const validUsers = req.body.user.filter(user => user.trim() !== '');

            const userChecks = validUsers.map(async (username, index) => {
                const user = await User.findOne({ username });
                if (user) {
                    return {
                        user: username,
                        privilege: req.body.privilege[index]
                    };
                }
                return null;
            });

            const results = await Promise.all(userChecks);
            payLoad.assignedUsers = results.filter(result => result !== null);
        } else {
            const username = req.body.user.trim();
            if (username !== '') {
                const user = await User.findOne({ username });
                if (user) {
                    payLoad.assignedUsers.push({
                        user: username,
                        privilege: req.body.privilege
                    });
                }
            }
        }
        await Project.create(payLoad);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};


const indexProject = async (req, res) => {
    try {
        const isShowing = true;
        const userProjs = await Project.find({creator : req.session.user._id});
        res.render('index.ejs', {userProjs, isShowing});
    } catch (error) {
        console.log(error);
    }
}

const showProject = async (req,res) => {
    try {
        const projectDetails = await Project.find({_id : req.params.projectId});
        res.render('partials/projects/show.ejs',{projectDetails});
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req,res) => {
    try {
        const project = await Project.find({_id : req.params.projectId}).deleteOne();
        res.redirect('/users/user._id/projects');
    }
    catch (error) {
        console.log(error);
    }
}

const editProject = async (req,res) => {
    res.render('partials/projects/edit.ejs');
}

module.exports = {
    newProject,
    createProject,
    indexProject,
    showProject,
    deleteProject,
    editProject,
}
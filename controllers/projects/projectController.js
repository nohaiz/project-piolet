// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newProject =  (req, res, next) => {
    const isNewLinkClicked = true;
    res.render('index.ejs',{isNewLinkClicked});
}

const userEntry = async (users, privileges, payLoad, userSession, projectId) => {
    const project = await Project.findById(projectId);
    let userCreator;
    if (project) {
        userCreator = await User.findById(project.creator);
    } else {
        userCreator = userSession;
    }

    if (Array.isArray(users)) {
        const userPrivilegeMap = new Map();

        users.forEach((username, index) => {
            username = username.trim();
            if (username && username !== userCreator.username) {
                userPrivilegeMap.set(username, privileges[index]);
            }
        });

        const validUsers = Array.from(userPrivilegeMap.keys());
        const userChecks = validUsers.map(async (username) => {
            const user = await User.findOne({ username });
            if (user) {
                return {
                    user: username,
                    privilege: userPrivilegeMap.get(username)
                };
            }
            return null;
        });

        const results = await Promise.all(userChecks);
        payLoad.assignedUsers = results.filter(result => result !== null);
    } else {
        const username = users.trim();
        if (username !== '' && username !== userCreator.username) {
            const user = await User.findOne({ username });
            if (user) {
                payLoad.assignedUsers.push({
                    user: username,
                    privilege: privileges
                });
            }
        }
    }
};

const createProject = async (req, res) => {
    try {
        const payLoad = {
            title: req.body.title,
            creator: req.session.user._id,
            dueDate : req.body.dueDate,
            assignedUsers: [],
        };

        const users = req.body.user;
        const privileges = req.body.privilege;
        const userSession = req.session.user; 

        await userEntry(users, privileges, payLoad, userSession);
        await Project.create(payLoad);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

let userProjs;
let isShowing;
let userAssignedProjects;

const indexProject = async (req, res) => {
    try {
        isShowing = true;
        userProjs = await Project.find({creator : req.session.user._id});
        const allProjects = await Project.find();

        userAssignedProjects = allProjects.filter(project =>
            project.assignedUsers.some(user => user.user === req.session.user.username),
        );        
        res.render('index.ejs', {userProjs, isShowing, userAssignedProjects});

    } catch (error) {
        console.log(error);
    }
}

let formattedProjectDetails;
let theLord;

const showProject = async (req, res) => {
    try {
        const projectDetails = await Project.find({ _id: req.params.projectId });   
        const projectCreator = await User.findById(projectDetails[0].creator);
        theLord = projectCreator.username; 

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true 
            };
            return date.toLocaleString('en-US', options);
        };

        formattedProjectDetails = projectDetails.map(project => ({
            ...project.toObject(),
            dueDate: formatDate(project.dueDate)
        }));
        res.render('partials/projects/show.ejs', { projectDetails: formattedProjectDetails,
            userProjs,
            isShowing,
            userAssignedProjects,
            theLord });

    } catch (error) {
        console.log(error);
    }
};

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
    try {
        const formatDate = (date) => {
            if (!date) return '';
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const project = await Project.findById(req.params.projectId);
        const formattedDueDate = formatDate(project.dueDate);
        const assignee = project.assignedUsers.map(({user,privilege}) => ({[user]: privilege}));
        res.render('partials/projects/edit.ejs', {project, assignee, formattedDueDate, isShowing, userProjs, userAssignedProjects, theLord});
    }
    catch(error) {
        console.log(error);
    }
}
const updateProject = async (req, res) => {
    try {
        const { title, dueDate, user, privilege } = req.body;
        const projectId = req.params.projectId;
        const userSession = req.session.user._id;
        const updatedPayLoad = {
            title,
            dueDate,
            assignedUsers: []
        };

        await userEntry(user, privilege ,updatedPayLoad, userSession, projectId);

        const project = await Project.findByIdAndUpdate(projectId, updatedPayLoad, { new: true });
        await project.save();
        res.redirect(`/users/${req.params.userId}/projects/${req.params.projectId}`);

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    newProject,
    createProject,
    indexProject,
    showProject,
    deleteProject,
    editProject,
    updateProject,
}

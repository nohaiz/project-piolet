// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newProject =  (req, res, next) => {
    const isNewLinkClicked = true;
    res.render('index.ejs',{isNewLinkClicked});
}

const userEntry = () => {

}

const createProject = async (req, res) => {
    try {
        const payLoad = {
            title: req.body.title,
            creator: req.session.user._id,
            dueDate : req.body.dueDate,
            assignedUsers: []
        };
        const creator = await User.findById(payLoad.creator);
        if (Array.isArray(req.body.user)) {
            const validUsers = req.body.user.filter(username => username.trim() !== '' && username !== creator.username);

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
            if (username !== '' && username !== creator.username) {
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
const showProject = async (req, res) => {
    try {
        const projectDetails = await Project.find({ _id: req.params.projectId });        
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
        res.render('partials/projects/show.ejs', { projectDetails: formattedProjectDetails, userProjs, isShowing, userAssignedProjects });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching project details.');
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
        res.render('partials/projects/edit.ejs', {project, assignee, formattedDueDate});
    }catch(error) {
        console.log(error);
    }
}
const updateProject = async(req,res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.projectId, req.body, {new:true});
        console.log(req.body);
        await project.save();
        console.log(project);
    }
    catch (error) {
        console.log(error)
    }
    res.render('partials/projects/show.ejs', { projectDetails: formattedProjectDetails, userProjs, isShowing, userAssignedProjects });
}

module.exports = {
    newProject,
    createProject,
    indexProject,
    showProject,
    deleteProject,
    editProject,
    updateProject,
}
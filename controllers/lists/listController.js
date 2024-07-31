// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newList = async (req, res, next) => {
    res.render('partials/lists/new.ejs',{projectId: req.params.projectId});
}

async function createList(req, res) {
    try {
        const projectId = req.params.projectId;
        const { listTitle, listText } = req.body;

        await Project.findByIdAndUpdate(
            projectId,
            {
                $push: {
                    lists: {
                        listTitle: listTitle,
                        listText: listText
                    }
                }
            },
            { new: true }
        );
    } catch (error) {
        console.error(error);
    }
    res.redirect(`/users/${req.params.userId}/projects/${req.params.projectId}`);
}

module.exports = {
    newList,
    createList,
}

// await Project.findByIdAndUpdate(projectId,{
//     lists: {listTitle, listText},
//     }, {new: true});
// MODELS

const Project = require('../../models/project.js');
const User = require('../../models/user.js');

const newList = async (req, res, next) => {
    res.render('partials/lists/new.ejs',{projectId: req.params.projectId});
}

async function createList(req, res) {
    try {
        const projectId = req.params.projectId;
        let { listTitle, listText } = req.body;
        
        if (Array.isArray(listText)) {
            listText = listText.filter((empty) => empty !== '')
            await Project.findByIdAndUpdate(projectId,{$push: {lists: {listTitle: listTitle,listText: listText}}},{ new: true });
        }
        else{
            await Project.findByIdAndUpdate(projectId,{$push: {lists: {listTitle: listTitle,listText: listText}}},{ new: true });
        }
    } catch (error) {
        console.error(error);
    }
    res.redirect(`/users/${req.params.userId}/projects/${req.params.projectId}`);
}

const deleteList = async (req,res) => {
    try {
        const projectId = req.params.projectId;
        const listId = req.params.listId;
        await Project.updateOne(
            { _id: projectId }, 
            { $pull: { lists: { _id: listId } } } 
        );
        res.redirect(`/users/${req.session.user._id}/projects/${req.params.projectId}`);

    } catch(error) {
        console.log(error);
    }
}

const editList = async(req,res) => {
    const listId = req.params.listId;
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId); 
    const lists = project.lists.id(listId)
    res.render('partials/lists/edit.ejs',{projectId, listId , lists});
}

const updateList = async(req,res) => {
    const { projectId, listId } = req.params;
    try {
        const payLoad = req.body;
        const project = await Project.findById(projectId);
        const list = project.lists.id(listId);
        list.set(payLoad);
        await project.save();
    }
    catch (error) {
        console.log(error);
    }
    res.redirect(`/users/${req.session.user._id}/projects/${projectId}`);
}

module.exports = {
    newList,
    createList,
    deleteList,
    editList,
    updateList,
}

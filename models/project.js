const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: String,
  users: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
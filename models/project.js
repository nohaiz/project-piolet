const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    privilege: {
      type: String,
      enum: ['admin', 'member', 'observer'],
    }
  }]
  
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const mongoose = require('mongoose');
const { validate } = require('./user');

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
  dueDate : {
    type: Date,
  },
  assignedUsers: [{
    user: String,
    privilege: {
      type: String,
      enum: ['admin', 'member', 'observer'],
      default: 'member', 
    }
  }]
  
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
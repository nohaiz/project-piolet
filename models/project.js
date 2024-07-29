const mongoose = require('mongoose');

const AssignedUserSchema = mongoose.Schema({
    user: String,
    privilege: {
      type: String,
      enum: ['admin', 'member', 'observer'],
      default: 'member', 
    }
})

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
  assignedUsers : [AssignedUserSchema]
  
  
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
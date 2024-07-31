const mongoose = require('mongoose');

const AssignedUserSchema = mongoose.Schema({
    user: String,
    privilege: {
      type: String,
      enum: ['admin', 'member', 'observer'],
      default: 'member', 
    }
});

const listSchema = mongoose.Schema({
    listTitle: String,
    listText: [String],
}
,{ timestamps: true });

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
  assignedUsers : [AssignedUserSchema],

  lists : [listSchema],
  
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);


module.exports = Project;
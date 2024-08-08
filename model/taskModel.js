const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const Task = require("../model/taskModel");
const AppError = require("../utils/AppError");

exports.getTaskByID = async (req, res, next) => {
  try {
    const item = await Task.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      next(new AppError("No task found with this id", 404));
    }
  } catch (err) {
    next(err);
  }
};

exports.updateTaskById = async (req, res, next) => {
  try {
    const data = await Task.findOneAndUpdate(
      { _id : req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!data) {
      return next(AppError("Task not found", 404));
    }
    res.status(200).json({data});
  } catch (error) {
    next(error);
  }
};

exports.deleteTaskById = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.postTask = async (req, res, next) => {
  try {
    const newItem = await new Task(req.body).save();
    res.status(200).json({ message: "Data added successfully", data: newItem });
  } catch (err) {
    next(err);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const data = await Task.find({ userId: req.params.id });
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    next(err);
  }
};

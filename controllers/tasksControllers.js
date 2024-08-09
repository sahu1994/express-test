const Task = require("../model/taskModel");

exports.getTaskByID = async (req, res, next) => {
  try {
    const item = await Task.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(400).json({ status: "No item found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

exports.updateTaskById = async (req, res, next) => {
  try {
    const Task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Task) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not updated" });
    }
    res.status(200).json(Task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteTaskById = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const Task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Task) {
      return res.status(404).send();
    }
    res.status(200).json(Task);
  } catch (error) {
    res.status(500).json({ error: "Item not updated" });
  }
};

exports.postTask = async (req, res, next) => {
  try {
    const newItem = await new Task(req.body).save();
    res
      .status(200)
      .json({ message: "Data added successfully", data: newItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add data", details: err });
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const data = await Task.find({ userId: req.params.id });
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

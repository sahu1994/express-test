const DataModel = require("../model/datasource.js");

exports.getUserByID = async (req, res, next) => {
  try {
    const item = await DataModel.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(400).json({ status: "No item found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const user = await DataModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Item not updated" });
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    await DataModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await DataModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Item not updated" });
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const newItem = await new DataModel(req.body).save();
    res
      .status(200)
      .json({ message: "Data added successfully", data: { newItem } });
  } catch (err) {
    res.status(500).json({ error: "Failed to add data", details: err });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await DataModel.find();
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
};

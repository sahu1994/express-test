const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Task = require("./model/taskModel");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = "4000";

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI);

app.get("/", async (req, res) => {
  try {
    const data = await Task.find();
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "fail", message: `Can't find ${req.originalUrl} server` });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

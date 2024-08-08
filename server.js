const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const app = express();
const DataModel = require("./model/datasource.js");
const userRounter = require("./routes/usersRouter.js");
const authRoutes = require("./routes/authRoutes.js");

const PORT = "3000";

app.use(express.json());
app.use("/users", userRounter);
app.use("/user", authRoutes);
app.use(cors())

mongoose.connect(process.env.MONGO_URI)

app.get("/", async (req, res) => {
  try {
    const data = await DataModel.find();
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

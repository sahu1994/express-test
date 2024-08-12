const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const AppError = require("./utils/AppError");
const app = express();
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const globalErrorHandler = require("./utils/globalErrorHandler");

const PORT = "4000";
mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  try{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  } catch(error){
    next(error)
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  postTask,
  getTaskByID,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/tasksControllers");
const { protect } = require("../controllers/authControllers");

router.route("/").get(getAllTasks).post(postTask);

router
  .route("/:id")
  .get(getTaskByID)
  .put(updateTaskById)
  .delete(deleteTaskById);

module.exports = router;

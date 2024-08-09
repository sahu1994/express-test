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

router.route("/").post(postTask);

router
  .route("/:id")
  .get(getAllTasks)
  .get(getTaskByID)
  .put(updateTaskById)
  .delete(deleteTaskById);

module.exports = router;

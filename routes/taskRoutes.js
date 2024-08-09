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

router.route("/").post(protect, postTask);

router
  .route("/:id")
  .get(protect, getAllTasks)
  .get(protect, getTaskByID)
  .put(protect, updateTaskById)
  .delete(protect, deleteTaskById);

module.exports = router;

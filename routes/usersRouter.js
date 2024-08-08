const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  postUser,
  getUserByID,
  updateUserById,
  deleteUserById,
} = require("../controllers/usersControllers");
const { protect } = require("../controllers/authControllers");

router.route("/").get(getAllUsers).post(protect, postUser);

router
  .route("/:id")
  .get(getUserByID)
  .put(protect, updateUserById)
  .delete(protect, deleteUserById);

module.exports = router;

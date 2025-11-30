const express = require("express");

const router = express.Router();

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/todoController");

const { signup, login } = require("../controllers/authController");

// Task routes
router.route("/new").post(createTask);
router.route("/get").get(getTask);
router.route("/update/:id").put(updateTask);
router.route("/delete/:id").delete(deleteTask);

// Authentication routes
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
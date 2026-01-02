const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

router.post("/", createTask);
router.get("/", getTasks);

module.exports = router;

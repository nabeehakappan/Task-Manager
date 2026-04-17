const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();


// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET ALL TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
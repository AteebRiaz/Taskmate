const express = require("express");
const Task = require("../../models/task");

const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
    });

    const savedTask = await newTask.save();
    res.status(201).send(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Retrieve a list of tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Update an existing task
router.put("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, dueDate, priority, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, priority, completed },
      { new: true }
    );

    res.status(200).send(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).send(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;

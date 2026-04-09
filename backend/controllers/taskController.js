const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
    try {
        const tasks = Task.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createTask = (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const newTask = Task.create(title);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { completed, title } = req.body;
    try {
        const updatedTask = Task.update(id, { completed, title });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    try {
        const success = Task.delete(id);
        if (!success) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

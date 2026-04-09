const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '../data/tasks.json');

const getTasks = () => {
    if (!fs.existsSync(DATA_PATH)) {
        fs.writeFileSync(DATA_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_PATH);
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2));
};

module.exports = {
    getAll: () => getTasks(),
    create: (title) => {
        const tasks = getTasks();
        const newTask = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        saveTasks(tasks);
        return newTask;
    },
    update: (id, updates) => {
        const tasks = getTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            saveTasks(tasks);
            return tasks[index];
        }
        return null;
    },
    delete: (id) => {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);
        if (tasks.length !== filteredTasks.length) {
            saveTasks(filteredTasks);
            return true;
        }
        return false;
    }
};

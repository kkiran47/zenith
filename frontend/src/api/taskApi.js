import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/tasks',
    headers: { 'Content-Type': 'application/json' }
});

export const getTasks = () => api.get('/');
export const createTask = (title) => api.post('/', { title });
export const updateTask = (id, updates) => api.patch(`/${id}`, updates);
export const deleteTask = (id) => api.delete(`/${id}`);

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';
import EmptyState from './components/EmptyState';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import FilterBar from './components/FilterBar';
import TaskDetailModal from './components/TaskDetailModal';
import { LayoutGrid, CheckSquare, Clock, Zap, Search, Trash2, SlidersHorizontal } from 'lucide-react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getTasks();
            setTasks(res.data);
        } catch {
            setError('System Link Failed. Verify backend status.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchTasks(); }, [fetchTasks]);

    const handleAdd = async (title) => {
        try {
            setAdding(true);
            const res = await createTask(title);
            setTasks(prev => [res.data, ...prev]);
        } catch {
            setError('Failed to persist objective.');
        } finally {
            setAdding(false);
        }
    };

    const handleToggle = async (id, completed) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
        try { await updateTask(id, { completed }); } catch {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
        }
    };

    const handleDelete = async (id) => {
        const prev = [...tasks];
        setTasks(prev => prev.filter(t => t.id !== id));
        try { await deleteTask(id); } catch {
            setTasks(prev);
        }
    };

    const handleClearCompleted = async () => {
        const completedTasks = tasks.filter(t => t.completed);
        const originalTasks = [...tasks];
        
        // Optimistic update
        setTasks(prev => prev.filter(t => !t.completed));
        
        try {
            // Sequential deletes (simple approach for in-memory)
            await Promise.all(completedTasks.map(t => deleteTask(t.id)));
        } catch {
            setTasks(originalTasks);
            setError('Bulk removal failed partially.');
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            const matchesFilter = filter === 'all' || (filter === 'completed' ? t.completed : !t.completed);
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [tasks, filter, searchQuery]);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
        ratio: tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length).toFixed(2) : 0
    };

    return (
        <div className="relative min-h-screen bg-black overflow-x-hidden">
            <div className="aurora-container">
                <div className="aurora" />
            </div>

            <main className="relative z-10 w-full flex flex-col items-center justify-start px-6 py-24 pb-48">
                
                <div className="w-full max-w-2xl flex flex-col gap-24">
                    
                    {/* Brand Header */}
                    <motion.header 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">
                            <Zap size={12} fill="currentColor" /> Zenith Command Center
                        </div>
                        <h1 className="text-8xl font-black text-white tracking-tighter leading-none select-none">
                            Zenith<span className="text-brand-gradient italic px-1">.</span>
                        </h1>
                    </motion.header>

                    {/* Command Input Module */}
                    <motion.section 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-[48px] p-10 md:p-12 space-y-10 shadow-3xl"
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-white text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                                <LayoutGrid size={16} className="text-indigo-400" />
                                Initialize Objective
                            </h2>
                        </div>
                        <AddTaskForm onAdd={handleAdd} isLoading={adding} />
                        <ErrorMessage message={error} onDismiss={() => setError('')} />
                    </motion.section>

                    {/* Analytics & Search Section */}
                    <motion.section 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="glass-panel rounded-[40px] p-10 text-center space-y-4">
                                <CheckSquare className="mx-auto text-emerald-500 mb-2" size={32} />
                                <span className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Execution</span>
                                <span className="block text-6xl font-black text-white tracking-tighter">{stats.completed}</span>
                            </div>
                            <div className="glass-panel rounded-[40px] p-10 text-center space-y-4">
                                <Clock className="mx-auto text-amber-500 mb-2" size={32} />
                                <span className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Processing</span>
                                <span className="block text-6xl font-black text-white tracking-tighter">{stats.pending}</span>
                            </div>
                        </div>

                        {/* Search Bar - View Option */}
                        <div className="glass-panel rounded-full p-2 pl-8 flex items-center gap-4 group">
                            <Search size={18} className="text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-slate-600"
                            />
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
                                <SlidersHorizontal size={16} />
                            </div>
                        </div>
                    </motion.section>

                    {/* Display Control Section */}
                    <motion.section 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="glass-panel rounded-full p-2.5 flex-1 w-full">
                            <FilterBar activeFilter={filter} onFilterChange={setFilter} counts={stats} />
                        </div>
                        
                        {/* Remove Option - Bulk */}
                        <button
                            onClick={handleClearCompleted}
                            disabled={stats.completed === 0}
                            className="w-full md:w-auto px-8 py-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500/20 transition-all disabled:opacity-0 disabled:scale-95 cursor-pointer flex items-center justify-center gap-3"
                        >
                            <Trash2 size={14} />
                            Purge Archives
                        </button>
                    </motion.section>

                    {/* Data Matrix display */}
                    <section className="space-y-12">
                        <div className="flex items-center gap-8 justify-center opacity-30">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white">Data Matrix</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
                        </div>

                        <div className="min-h-[400px]">
                            {loading ? (
                                <div className="flex justify-center py-32"><LoadingSpinner /></div>
                            ) : filteredTasks.length === 0 ? (
                                <EmptyState filter={filter} />
                            ) : (
                                <div className="flex flex-col gap-8 w-full">
                                    <AnimatePresence mode="popLayout">
                                        {filteredTasks.map(task => (
                                            <TaskItem 
                                                key={task.id} 
                                                task={task} 
                                                onToggle={handleToggle} 
                                                onDelete={handleDelete}
                                                // Click on whole item to view details
                                                onView={() => setSelectedTask(task)}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </section>

                    <footer className="pt-32 text-center opacity-20">
                        <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white">Zenith Architecture</p>
                    </footer>
                </div>
            </main>

            {/* Task View Modal */}
            <TaskDetailModal 
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Hash, Type, CheckCircle2, Clock, Trash2 } from 'lucide-react';

export default function TaskDetailModal({ task, isOpen, onClose, onDelete }) {
    if (!task) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-panel w-full max-w-lg rounded-[40px] overflow-hidden relative shadow-3xl"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-32 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border-b border-white/5 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                                {task.completed ? <CheckCircle2 className="text-emerald-500" size={32} /> : <Clock className="text-amber-500" size={32} />}
                            </div>
                        </div>

                        <div className="p-10 space-y-8">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                                    <Hash size={12} /> Objective Identity
                                </span>
                                <code className="block text-xs text-indigo-400 bg-indigo-400/5 px-3 py-1.5 rounded-lg border border-indigo-500/10">
                                    {task.id}
                                </code>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                                    <Type size={12} /> Content
                                </span>
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                    {task.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Established</span>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Calendar size={14} className="text-slate-500" />
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="space-y-1 text-right">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Status</span>
                                    <div className={`text-sm font-bold uppercase ${task.completed ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {task.completed ? 'Synchronized' : 'In Progress'}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    Dismiss
                                </button>
                                <button
                                    onClick={() => { onDelete(task.id); onClose(); }}
                                    className="flex-shrink-0 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500/20 transition-all cursor-pointer"
                                    aria-label="Remove Task"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Close Icon Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-500 transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

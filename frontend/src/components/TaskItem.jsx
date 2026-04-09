import { motion } from 'framer-motion';
import { Trash2, Pencil, Check, X, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit, onView }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleEditSubmit = (e) => {
        if (e) e.stopPropagation();
        if (editValue.trim() && editValue !== task.title) {
            onEdit(task.id, editValue.trim());
        }
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="group relative"
        >
            <div 
                onClick={!isEditing ? onView : undefined}
                className={`glass-panel rounded-3xl glass-card-hover p-6 md:p-8 flex flex-col gap-6 cursor-pointer overflow-hidden ${
                    task.completed ? 'opacity-60 grayscale-[0.2]' : ''
                }`}
            >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between gap-6">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(task.id, !task.completed); }}
                        className={`checkbox-pulse flex-shrink-0 cursor-pointer ${task.completed ? 'checked' : ''}`}
                    >
                        {task.completed && <Check size={14} className="m-auto text-white" strokeWidth={4} />}
                    </button>

                    <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <input
                                autoFocus
                                value={editValue}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={handleEditSubmit}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleEditSubmit();
                                    if (e.key === 'Escape') { e.stopPropagation(); setEditValue(task.title); setIsEditing(false); }
                                }}
                                className="w-full bg-white/5 border border-indigo-500/50 rounded-xl px-3 py-2 text-sm text-white outline-none"
                            />
                        ) : (
                            <div className="space-y-1">
                                <span className={`block text-base font-bold tracking-tight transition-all duration-300 ${
                                    task.completed ? 'text-slate-500 line-through' : 'text-slate-100'
                                }`}>
                                    {task.title}
                                </span>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Eye size={10} className="text-white" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Focus to View</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="p-2 rounded-xl hover:bg-white/10 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        >
                            <Pencil size={14} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                            className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/[0.04]">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-700" />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {task.completed && (
                        <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Archived</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

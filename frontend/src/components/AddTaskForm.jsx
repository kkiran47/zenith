import { useState } from 'react';
import { Plus, Zap } from 'lucide-react';

export default function AddTaskForm({ onAdd, isLoading }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New objective..."
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-300 disabled:opacity-50"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none group-focus-within:text-indigo-500 transition-colors">
                    <Zap size={16} />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || !title.trim()}
                className="w-full relative flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 disabled:grayscale disabled:scale-100 cursor-pointer overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                <Plus size={14} strokeWidth={3} />
                Confirm Sync
            </button>
        </form>
    );
}

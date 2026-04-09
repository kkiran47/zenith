const FILTERS = [
    { key: 'all', label: 'Omni' },
    { key: 'pending', label: 'Active' },
    { key: 'completed', label: 'Static' }
];

export default function FilterBar({ activeFilter, onFilterChange, counts }) {
    return (
        <div className="flex bg-white/[0.03] border border-white/5 p-1 rounded-2xl w-full">
            {FILTERS.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onFilterChange(key)}
                    className={`relative flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                        activeFilter === key ? 'text-white' : 'text-slate-600 hover:text-slate-400'
                    }`}
                >
                    {activeFilter === key && (
                        <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl" />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {label}
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                            activeFilter === key ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/5 text-slate-700'
                        }`}>
                            {counts[key] || 0}
                        </span>
                    </span>
                </button>
            ))}
        </div>
    );
}

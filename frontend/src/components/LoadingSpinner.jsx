import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
            <motion.div
                className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            />
            <p className="text-slate-500 text-sm">Fetching your tasks…</p>
        </div>
    );
}

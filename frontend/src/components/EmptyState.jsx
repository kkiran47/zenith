import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

export default function EmptyState({ filter }) {
    const messages = {
        all: { title: 'No tasks yet', sub: 'Add your first task above to get started.' },
        pending: { title: 'All caught up!', sub: 'No pending tasks. Great work!' },
        completed: { title: 'Nothing completed yet', sub: 'Complete a task to see it here.' }
    };

    const { title, sub } = messages[filter] || messages.all;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-5">
                    <ClipboardList size={28} className="text-slate-500" />
                </div>
                <p className="text-slate-300 font-semibold text-base">{title}</p>
                <p className="text-slate-500 text-sm mt-1">{sub}</p>
            </motion.div>
        </AnimatePresence>
    );
}

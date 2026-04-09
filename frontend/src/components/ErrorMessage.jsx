import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onDismiss }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
                >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span className="flex-1">{message}</span>
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="flex-shrink-0 hover:text-red-300 transition-colors cursor-pointer"
                            aria-label="Dismiss error"
                        >
                            <X size={14} />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

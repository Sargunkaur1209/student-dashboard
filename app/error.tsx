"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4"
        >
            <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-900/50 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
            </div>
            <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Something went wrong</h2>
                <p className="text-sm text-[var(--text-muted)]">{error.message}</p>
            </div>
            <button
                onClick={reset}
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
                Try again
            </button>
        </motion.div>
    )
}

"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
    value: number // 0–100
    delay?: number
}

export default function ProgressBar({ value, delay = 0 }: ProgressBarProps) {
    return (
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-violet-400"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay, ease: [0.34, 1.56, 0.64, 1] }}
            />
        </div>
    )
}

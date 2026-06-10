"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const INTENSITY = [
    "bg-white/5",
    "bg-violet-900/50",
    "bg-violet-700/60",
    "bg-violet-500/70",
    "bg-violet-400",
]

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"]

function generateActivity() {
    const weeks = 10
    const days = 7
    return Array.from({ length: weeks }, (_, wi) =>
        Array.from({ length: days }, (_, di) => {
            const total = wi * days + di
            if (total > weeks * days - 5) return 0
            return Math.floor(Math.random() * 5)
        })
    )
}

// Empty placeholder grid — shown during SSR and before mount
const EMPTY_GRID = Array.from({ length: 10 }, () => Array.from({ length: 7 }, () => 0))

export default function ActivityTile() {
    const [activity, setActivity] = useState(EMPTY_GRID)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setActivity(generateActivity())
        setMounted(true)
    }, [])

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Learning Activity</h2>
                <span className="text-xs text-[var(--text-muted)] bg-white/5 px-2 py-1 rounded-lg">Last 10 weeks</span>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1">
                {activity.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1.5">
                        {week.map((level, di) => (
                            <motion.div
                                key={di}
                                initial={mounted ? { opacity: 0, scale: 0.5 } : false}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (wi * 7 + di) * 0.005, type: "spring", stiffness: 300 }}
                                title={`Week ${wi + 1}, ${DAY_LABELS[di] || `Day ${di + 1}`}: ${level} sessions`}
                                className={`w-3 h-3 rounded-sm ${INTENSITY[level]} transition-colors hover:ring-1 hover:ring-violet-400/50 cursor-default`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] text-[var(--text-muted)]">Less</span>
                {INTENSITY.map((cls, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
                ))}
                <span className="text-[11px] text-[var(--text-muted)]">More</span>
            </div>
        </motion.section>
    )
}

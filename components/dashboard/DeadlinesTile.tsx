"use client"

import { motion } from "framer-motion"
import { CalendarClock } from "lucide-react"
import type { Course } from "@/lib/types"

function daysUntil(dateStr: string) {
    const diff = new Date(dateStr).getTime() - Date.now()
    return Math.ceil(diff / 86400000)
}

function urgencyColor(days: number) {
    if (days <= 3) return "text-red-400 bg-red-950/40 border-red-900/40"
    if (days <= 7) return "text-orange-400 bg-orange-950/40 border-orange-900/40"
    return "text-emerald-400 bg-emerald-950/40 border-emerald-900/40"
}

export default function DeadlinesTile({ courses }: { courses: Course[] }) {
    const withDue = courses
        .filter((c) => c.due_date)
        .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
        >
            <div className="flex items-center gap-2 mb-4">
                <CalendarClock size={15} className="text-[var(--text-muted)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Upcoming Deadlines</h2>
            </div>

            {withDue.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)]">No upcoming deadlines.</p>
            ) : (
                <ul className="space-y-2">
                    {withDue.map((course, i) => {
                        const days = daysUntil(course.due_date!)
                        const cls = urgencyColor(days)
                        return (
                            <motion.li
                                key={course.id}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 28 }}
                                className="flex items-center justify-between gap-3 py-2 border-b border-[var(--border)] last:border-0"
                            >
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-[var(--text-primary)] truncate">{course.title}</p>
                                    <p className="text-[11px] text-[var(--text-muted)]">{course.completed_modules}/{course.total_modules} modules</p>
                                </div>
                                <span className={`text-[11px] font-semibold px-2 py-1 rounded-lg border shrink-0 ${cls}`}>
                                    {days <= 0 ? "Due today" : `${days}d left`}
                                </span>
                            </motion.li>
                        )
                    })}
                </ul>
            )}
        </motion.section>
    )
}

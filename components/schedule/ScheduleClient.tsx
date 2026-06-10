"use client"

import { motion } from "framer-motion"
import { CalendarClock, Clock, CheckCircle2 } from "lucide-react"
import type { Course } from "@/lib/types"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Static weekly time slots per day
const WEEKLY_PLAN: Record<string, { time: string; label: string }[]> = {
    Mon: [{ time: "09:00", label: "Full-Stack Web Development" }, { time: "14:00", label: "Self Review" }],
    Tue: [{ time: "10:00", label: "UI/UX Design Fundamentals" }],
    Wed: [{ time: "09:00", label: "Database Engineering" }, { time: "15:00", label: "Machine Learning Basics" }],
    Thu: [{ time: "11:00", label: "Full-Stack Web Development" }],
    Fri: [{ time: "09:00", label: "UI/UX Design Fundamentals" }, { time: "13:00", label: "Project Work" }],
    Sat: [{ time: "10:00", label: "Machine Learning Basics" }],
    Sun: [],
}

function daysUntil(d: string | null) {
    if (!d) return null
    return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
}

function urgencyClass(days: number) {
    if (days <= 0) return "text-red-400 border-red-900/40 bg-red-950/30"
    if (days <= 3) return "text-red-400 border-red-900/40 bg-red-950/20"
    if (days <= 7) return "text-orange-400 border-orange-900/40 bg-orange-950/20"
    return "text-emerald-400 border-emerald-900/40 bg-emerald-950/20"
}

const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3)

export default function ScheduleClient({ courses }: { courses: Course[] }) {
    const withDue = courses.filter((c) => c.due_date).sort(
        (a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
    )

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Weekly timetable */}
            <div className="xl:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Weekly Schedule</h2>
                <div className="grid grid-cols-7 gap-2">
                    {DAYS.map((day, di) => {
                        const slots = WEEKLY_PLAN[day] ?? []
                        const isToday = day === today
                        return (
                            <motion.div
                                key={day}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: di * 0.05, type: "spring", stiffness: 280, damping: 26 }}
                                className={`rounded-xl p-2 border min-h-[120px] ${isToday
                                    ? "border-[var(--accent)]/40 bg-[var(--accent-glow)]"
                                    : "border-[var(--border)] bg-white/[0.02]"
                                    }`}
                            >
                                <p className={`text-[11px] font-semibold mb-2 text-center ${isToday ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                                    {day}
                                    {isToday && <span className="block text-[9px] font-normal">Today</span>}
                                </p>
                                <div className="space-y-1.5">
                                    {slots.map((slot, si) => (
                                        <div key={si} className="rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/15 px-1.5 py-1">
                                            <p className="text-[9px] text-[var(--accent)] font-medium">{slot.time}</p>
                                            <p className="text-[9px] text-[var(--text-muted)] leading-tight mt-0.5 line-clamp-2">{slot.label}</p>
                                        </div>
                                    ))}
                                    {slots.length === 0 && (
                                        <p className="text-[10px] text-[var(--text-muted)] text-center mt-4 opacity-40">Free</p>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Deadlines panel */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
                <div className="flex items-center gap-2 mb-4">
                    <CalendarClock size={14} className="text-[var(--text-muted)]" />
                    <h2 className="text-sm font-semibold text-[var(--text-primary)]">Deadlines</h2>
                </div>

                {withDue.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)]">No deadlines set.</p>
                ) : (
                    <ul className="space-y-3">
                        {withDue.map((course, i) => {
                            const days = daysUntil(course.due_date)!
                            const cls = urgencyClass(days)
                            return (
                                <motion.li
                                    key={course.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, type: "spring", stiffness: 280, damping: 26 }}
                                    className={`p-3 rounded-xl border ${cls}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-xs font-medium text-[var(--text-primary)] leading-snug">{course.title}</p>
                                        <span className="text-[10px] font-bold shrink-0 mt-0.5">
                                            {days <= 0 ? "Today" : `${days}d`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1 text-[10px]">
                                            <CheckCircle2 size={10} />
                                            {course.completed_modules}/{course.total_modules} done
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px]">
                                            <Clock size={10} />
                                            {new Date(course.due_date!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                        </div>
                                    </div>
                                    {/* Mini progress */}
                                    <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-current opacity-60"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.06 }}
                                        />
                                    </div>
                                </motion.li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

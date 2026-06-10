"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, Zap, Award, BookOpen } from "lucide-react"
import type { Course, UserStats } from "@/lib/types"

const ICON_COLORS = ["text-violet-400", "text-blue-400", "text-emerald-400", "text-rose-400"]
const BAR_COLORS = ["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500"]

const WEEKLY_HOURS = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 2 },
    { day: "Fri", hours: 4 },
    { day: "Sat", hours: 1 },
    { day: "Sun", hours: 0.5 },
]
const MAX_HOURS = Math.max(...WEEKLY_HOURS.map((d) => d.hours))

export default function AnalyticsClient({
    courses,
    stats,
}: {
    courses: Course[]
    stats: UserStats | null
}) {
    const avgProgress = courses.length
        ? Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)
        : 0

    return (
        <div className="space-y-5">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Hours", value: stats?.total_hours ?? 0, suffix: "h", icon: Clock, color: "text-blue-400" },
                    { label: "XP Points", value: stats?.xp_points?.toLocaleString() ?? 0, suffix: "", icon: Zap, color: "text-yellow-400" },
                    { label: "Avg Progress", value: avgProgress, suffix: "%", icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Certificates", value: stats?.certificates ?? 0, suffix: "", icon: Award, color: "text-violet-400" },
                ].map((item, i) => {
                    const Icon = item.icon
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, type: "spring", stiffness: 280, damping: 26 }}
                            whileHover={{ scale: 1.02 }}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 flex items-center gap-3"
                        >
                            <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                                <Icon size={16} />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-[var(--text-primary)] leading-none">{item.value}{item.suffix}</p>
                                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.label}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* Course progress bars */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 26 }}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <BookOpen size={14} className="text-[var(--text-muted)]" />
                        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Course Progress</h2>
                    </div>
                    <ul className="space-y-4">
                        {courses.map((course, i) => (
                            <li key={course.id}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-[var(--text-primary)] truncate max-w-[180px]">{course.title}</span>
                                    <span className={`text-xs font-semibold ${ICON_COLORS[i % ICON_COLORS.length]}`}>{course.progress}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                    />
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                                    {course.completed_modules} of {course.total_modules} modules
                                </p>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Weekly hours bar chart */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 26 }}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Clock size={14} className="text-[var(--text-muted)]" />
                        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Hours This Week</h2>
                    </div>
                    <div className="flex items-end gap-2 h-36">
                        {WEEKLY_HOURS.map((d, i) => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                                <span className="text-[10px] text-[var(--text-muted)]">{d.hours}h</span>
                                <div className="w-full rounded-t-lg bg-white/5 overflow-hidden" style={{ height: "100px" }}>
                                    <motion.div
                                        className="w-full rounded-t-lg bg-[var(--accent)]"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(d.hours / MAX_HOURS) * 100}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
                                        style={{ marginTop: "auto" }}
                                    />
                                </div>
                                <span className="text-[10px] text-[var(--text-muted)]">{d.day}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-3">
                        <div className="text-center">
                            <p className="text-lg font-bold text-[var(--text-primary)]">
                                {WEEKLY_HOURS.reduce((s, d) => s + d.hours, 0)}h
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)]">Total this week</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-[var(--text-primary)]">
                                {(WEEKLY_HOURS.reduce((s, d) => s + d.hours, 0) / 7).toFixed(1)}h
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)]">Daily average</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

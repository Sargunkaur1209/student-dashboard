"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Code2, Palette, Database, Brain, Globe,
    Layers, Terminal, Cpu, BookOpen, ChevronDown,
} from "lucide-react"
import ProgressBar from "@/components/ui/ProgressBar"
import type { Course } from "@/lib/types"

const ICON_MAP: Record<string, React.ElementType> = {
    code: Code2, palette: Palette, database: Database, brain: Brain,
    globe: Globe, layers: Layers, terminal: Terminal, cpu: Cpu, book: BookOpen,
}

const CARD_GRADIENTS = [
    "from-violet-950/60 to-[var(--bg-card)]",
    "from-blue-950/60 to-[var(--bg-card)]",
    "from-emerald-950/60 to-[var(--bg-card)]",
    "from-rose-950/60 to-[var(--bg-card)]",
]

const ICON_COLORS = [
    "text-violet-400", "text-blue-400", "text-emerald-400", "text-rose-400",
]

function daysUntil(dateStr: string | null) {
    if (!dateStr) return null
    const diff = new Date(dateStr).getTime() - Date.now()
    return Math.ceil(diff / 86400000)
}

interface CourseCardProps {
    course: Course
    index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
    const [expanded, setExpanded] = useState(false)
    const Icon = ICON_MAP[course.icon_name] ?? BookOpen
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
    const iconColor = ICON_COLORS[index % ICON_COLORS.length]
    const days = daysUntil(course.due_date)

    // Generate mock module list based on completed count
    const modules = Array.from({ length: Math.min(course.total_modules, 8) }, (_, i) => ({
        label: `Module ${i + 1}`,
        done: i < course.completed_modules,
    }))

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: index * 0.08 }}
            layout
            className={`
        group relative overflow-hidden rounded-2xl border border-[var(--border)]
        bg-gradient-to-br ${gradient}
        hover:border-[var(--accent)]/40 transition-colors duration-300
      `}
        >
            {/* Glow on hover */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 30px 0 rgba(124,106,247,0.06)" }}
            />

            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor}`}>
                        <Icon size={18} />
                    </div>
                    <div className="flex items-center gap-2">
                        {days !== null && days <= 7 && (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${days <= 3 ? "text-red-400 bg-red-950/40 border-red-900/40" : "text-orange-400 bg-orange-950/40 border-orange-900/40"
                                }`}>
                                {days <= 0 ? "Due today" : `${days}d`}
                            </span>
                        )}
                        <span className="text-xs font-medium text-[var(--text-muted)] bg-white/5 px-2 py-1 rounded-lg">
                            {course.progress}%
                        </span>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 leading-snug">
                    {course.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                    {course.completed_modules}/{course.total_modules} modules ·{" "}
                    {course.progress < 30 ? "Just started" : course.progress < 70 ? "In progress" : "Almost done"}
                </p>

                <ProgressBar value={course.progress} delay={0.3 + index * 0.08} />

                {/* Expand toggle */}
                <motion.button
                    onClick={() => setExpanded((e) => !e)}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors w-full"
                >
                    <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={13} />
                    </motion.span>
                    {expanded ? "Hide modules" : "View modules"}
                </motion.button>
            </div>

            {/* Expandable module list */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="modules"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden border-t border-[var(--border)]"
                    >
                        <ul className="px-5 py-3 space-y-1.5">
                            {modules.map((mod, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex items-center gap-2 text-xs"
                                >
                                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${mod.done
                                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                                            : "border-[var(--border)] text-[var(--text-muted)]"
                                        }`}>
                                        {mod.done && (
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className={mod.done ? "text-[var(--text-muted)] line-through" : "text-[var(--text-primary)]"}>
                                        {mod.label}
                                    </span>
                                </motion.li>
                            ))}
                            {course.total_modules > 8 && (
                                <li className="text-[11px] text-[var(--text-muted)] pl-6">
                                    +{course.total_modules - 8} more modules
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Code2, Palette, Database, Brain, Globe,
    Layers, Terminal, Cpu, BookOpen, ChevronDown,
    PlayCircle, CheckCircle2, Clock,
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
const ICON_COLORS = ["text-violet-400", "text-blue-400", "text-emerald-400", "text-rose-400"]

function daysUntil(d: string | null) {
    if (!d) return null
    return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
}

export default function CourseDetailCard({ course, index }: { course: Course; index: number }) {
    const [open, setOpen] = useState(false)
    const [activeModule, setActiveModule] = useState<number | null>(null)

    const Icon = ICON_MAP[course.icon_name] ?? BookOpen
    const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
    const iconColor = ICON_COLORS[index % ICON_COLORS.length]
    const days = daysUntil(course.due_date)

    const modules = Array.from({ length: course.total_modules }, (_, i) => ({
        id: i,
        label: `Module ${i + 1}: ${MODULE_NAMES[i % MODULE_NAMES.length]}`,
        done: i < course.completed_modules,
        duration: `${10 + (i % 3) * 5}m`,
    }))

    const nextModule = modules.find((m) => !m.done)

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: index * 0.08 }}
            layout
            className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br ${gradient} hover:border-[var(--accent)]/40 transition-colors duration-300`}
        >
            <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 30px 0 rgba(124,106,247,0.06)" }}
            />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor}`}>
                        <Icon size={18} />
                    </div>
                    <div className="flex items-center gap-2">
                        {days !== null && days <= 7 && (
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${days <= 3 ? "text-red-400 bg-red-950/40 border-red-900/40" : "text-orange-400 bg-orange-950/40 border-orange-900/40"}`}>
                                {days <= 0 ? "Due today" : `${days}d left`}
                            </span>
                        )}
                        <span className="text-xs font-medium text-[var(--text-muted)] bg-white/5 px-2 py-1 rounded-lg">{course.progress}%</span>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{course.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                    {course.completed_modules}/{course.total_modules} modules ·{" "}
                    {course.progress < 30 ? "Just started" : course.progress < 70 ? "In progress" : "Almost done"}
                </p>

                <ProgressBar value={course.progress} delay={0.3 + index * 0.08} />

                {/* Continue button */}
                {nextModule && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setOpen(true); setActiveModule(nextModule.id) }}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium hover:bg-[var(--accent)]/20 transition-colors"
                    >
                        <PlayCircle size={13} />
                        Continue — {nextModule.label.split(":")[0]}
                    </motion.button>
                )}

                {/* View modules toggle */}
                <motion.button
                    onClick={() => setOpen((o) => !o)}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors w-full"
                >
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={13} />
                    </motion.span>
                    {open ? "Hide modules" : `View all ${course.total_modules} modules`}
                </motion.button>
            </div>

            {/* Module list */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="modules"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden border-t border-[var(--border)]"
                    >
                        <ul className="px-5 py-3 space-y-1 max-h-64 overflow-y-auto">
                            {modules.map((mod) => (
                                <motion.li
                                    key={mod.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: mod.id * 0.02 }}
                                >
                                    <button
                                        onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                                        className={`w-full flex items-center gap-2.5 py-2 px-2 rounded-lg text-xs text-left transition-colors ${activeModule === mod.id
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                                : "hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                            }`}
                                    >
                                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${mod.done ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-[var(--border)]"
                                            }`}>
                                            {mod.done
                                                ? <CheckCircle2 size={10} />
                                                : <span className="text-[9px] font-bold">{mod.id + 1}</span>
                                            }
                                        </span>
                                        <span className={`flex-1 truncate ${mod.done ? "line-through opacity-50" : ""}`}>{mod.label}</span>
                                        <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] shrink-0">
                                            <Clock size={9} />{mod.duration}
                                        </span>
                                    </button>

                                    {/* Expanded module detail */}
                                    <AnimatePresence>
                                        {activeModule === mod.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mx-2 mb-2 p-3 rounded-lg bg-white/5 border border-[var(--border)]">
                                                    <p className="text-[11px] text-[var(--text-muted)] mb-2">{mod.label}</p>
                                                    <p className="text-[11px] text-[var(--text-muted)]">
                                                        {mod.done
                                                            ? "✓ You've completed this module."
                                                            : "Start this module to continue your progress."}
                                                    </p>
                                                    {!mod.done && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            className="mt-2 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-[11px] font-medium"
                                                            onClick={() => alert(`Starting: ${mod.label}`)}
                                                        >
                                                            Start Module
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    )
}

const MODULE_NAMES = [
    "Introduction", "Core Concepts", "Deep Dive", "Practical Lab",
    "Advanced Topics", "Project Work", "Review & Quiz", "Final Assessment",
]

"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Flame, ArrowUpRight } from "lucide-react"

export default function HeroCard() {
    const router = useRouter()
    const streak = 12

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
        >
            {/* Background gradient blob */}
            <div
                aria-hidden
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #7c6af7 0%, transparent 70%)" }}
            />

            <div className="relative flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Good morning 👋</p>
                    <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                        Welcome back, Sargun
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] max-w-xs">
                        You&apos;re making great progress. Keep up the momentum and hit your weekly goal.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        onClick={() => router.push("/courses")}
                    >
                        Continue Learning
                        <ArrowUpRight size={14} />
                    </motion.button>
                </div>

                {/* Streak badge */}
                <div className="shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)]">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Flame size={24} className="text-orange-400" />
                    </motion.div>
                    <span className="text-xl font-bold text-[var(--text-primary)]">{streak}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">Day Streak</span>
                </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                    { label: "Courses", value: "4" },
                    { label: "Hours", value: "38" },
                    { label: "Completed", value: "2" },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-[var(--border)] px-3 py-2.5">
                        <p className="text-lg font-semibold text-[var(--text-primary)]">{stat.value}</p>
                        <p className="text-[11px] text-[var(--text-muted)]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}

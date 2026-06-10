"use client"

import { motion } from "framer-motion"
import { Clock, Zap, TrendingUp, Award } from "lucide-react"
import type { UserStats } from "@/lib/types"

const STATS = (s: UserStats) => [
    { label: "Hours Learned", value: s.total_hours, suffix: "h", icon: Clock, color: "text-blue-400" },
    { label: "XP Points", value: s.xp_points.toLocaleString(), suffix: "", icon: Zap, color: "text-yellow-400" },
    { label: "Completion Rate", value: s.completion_rate, suffix: "%", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Certificates", value: s.certificates, suffix: "", icon: Award, color: "text-violet-400" },
]

export default function StatsBar({ stats }: { stats: UserStats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS(stats).map((item, i) => {
                const Icon = item.icon
                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 26, delay: i * 0.07 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 flex items-center gap-3"
                    >
                        <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                            <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg font-bold text-[var(--text-primary)] leading-none">
                                {item.value}{item.suffix}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">{item.label}</p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

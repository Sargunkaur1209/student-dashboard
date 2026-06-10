"use client"

import { motion } from "framer-motion"
import {
    CheckCircle, Trophy, PlayCircle, Flame, Star, Zap,
} from "lucide-react"
import type { ActivityItem } from "@/lib/types"

const ICONS: Record<string, React.ElementType> = {
    "check-circle": CheckCircle,
    trophy: Trophy,
    "play-circle": PlayCircle,
    flame: Flame,
    star: Star,
    zap: Zap,
}

const ICON_COLORS: Record<string, string> = {
    "check-circle": "text-emerald-400",
    trophy: "text-yellow-400",
    "play-circle": "text-blue-400",
    flame: "text-orange-400",
    star: "text-violet-400",
    zap: "text-yellow-400",
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
}

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
        >
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Recent Activity</h2>

            <ol className="space-y-1">
                {items.map((item, i) => {
                    const Icon = ICONS[item.icon_name] ?? Zap
                    const color = ICON_COLORS[item.icon_name] ?? "text-violet-400"
                    return (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 28 }}
                            className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0"
                        >
                            <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                                <Icon size={13} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-[var(--text-primary)] truncate">{item.label}</p>
                                {item.detail && (
                                    <p className="text-[11px] text-[var(--text-muted)] truncate">{item.detail}</p>
                                )}
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)] shrink-0 mt-0.5">{timeAgo(item.created_at)}</span>
                        </motion.li>
                    )
                })}
            </ol>
        </motion.section>
    )
}

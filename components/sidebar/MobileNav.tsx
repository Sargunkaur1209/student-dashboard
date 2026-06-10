"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, BarChart2, Trophy, Settings } from "lucide-react"

const ITEMS = [
    { icon: LayoutDashboard, label: "Home" },
    { icon: BookOpen, label: "Courses" },
    { icon: BarChart2, label: "Stats" },
    { icon: Trophy, label: "Awards" },
    { icon: Settings, label: "Settings" },
]

export default function MobileNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)] border-t border-[var(--border)] px-2 pb-safe md:hidden">
            <div className="flex items-center justify-around">
                {ITEMS.map((item, i) => {
                    const Icon = item.icon
                    const active = i === 0
                    return (
                        <motion.button
                            key={item.label}
                            whileTap={{ scale: 0.9 }}
                            className={`flex flex-col items-center gap-1 py-3 px-3 rounded-xl transition-colors ${active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </motion.button>
                    )
                })}
            </div>
        </nav>
    )
}

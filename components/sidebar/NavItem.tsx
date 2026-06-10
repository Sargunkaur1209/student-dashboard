"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    BookOpen,
    BarChart2,
    Settings,
    Trophy,
    Calendar,
} from "lucide-react"

const ICONS: Record<string, React.ElementType> = {
    dashboard: LayoutDashboard,
    courses: BookOpen,
    analytics: BarChart2,
    settings: Settings,
    achievements: Trophy,
    schedule: Calendar,
}

interface NavItemProps {
    icon: string
    label: string
    href: string
    collapsed: boolean
}

export default function NavItem({ icon, label, href, collapsed }: NavItemProps) {
    const pathname = usePathname()
    const active = pathname === href
    const Icon = ICONS[icon] ?? LayoutDashboard

    return (
        <Link href={href} className="block">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`
          relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
          text-sm font-medium transition-colors duration-200 cursor-pointer
          ${active
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
                    }
        `}
            >
                {active && (
                    <motion.span
                        layoutId="sidebar-highlight"
                        className="absolute inset-0 rounded-xl bg-[var(--accent-glow)] border border-[var(--accent)]/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
                <Icon size={18} className="relative z-10 shrink-0" />
                {!collapsed && (
                    <span className="relative z-10 whitespace-nowrap">{label}</span>
                )}
            </motion.div>
        </Link>
    )
}

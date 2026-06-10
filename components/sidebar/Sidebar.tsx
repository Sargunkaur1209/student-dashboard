"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, GraduationCap, X } from "lucide-react"
import NavItem from "./NavItem"
import ThemeToggle from "@/components/ui/ThemeToggle"

const NAV_ITEMS = [
    { icon: "dashboard", label: "Dashboard", href: "/" },
    { icon: "courses", label: "My Courses", href: "/courses" },
    { icon: "schedule", label: "Schedule", href: "/schedule" },
    { icon: "analytics", label: "Analytics", href: "/analytics" },
    { icon: "achievements", label: "Achievements", href: "/achievements" },
    { icon: "settings", label: "Settings", href: "/settings" },
]

interface SidebarProps {
    collapsed: boolean
    onToggle: () => void
    isMobile: boolean
    mobileOpen: boolean
    onMobileClose: () => void
}

export default function Sidebar({
    collapsed,
    onToggle,
    isMobile,
    mobileOpen,
    onMobileClose,
}: SidebarProps) {
    const sidebarContent = (
        <motion.aside
            animate={{ width: collapsed && !isMobile ? 68 : 220 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col h-full bg-[var(--bg-card)] border-r border-[var(--border)] overflow-hidden"
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--border)] shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center shrink-0">
                        <GraduationCap size={16} className="text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-semibold text-sm text-[var(--text-primary)] whitespace-nowrap"
                        >
                            NextGen-Learning
                        </motion.span>
                    )}
                </div>
                {isMobile ? (
                    <button onClick={onMobileClose} className="text-[var(--text-muted)] hover:text-white p-1">
                        <X size={18} />
                    </button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onToggle}
                        className="w-6 h-6 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/50 transition-colors"
                    >
                        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronLeft size={12} />
                        </motion.div>
                    </motion.button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        collapsed={collapsed && !isMobile}
                    />
                ))}
            </nav>

            {/* User */}
            <div className="p-3 border-t border-[var(--border)] shrink-0">
                <div className="flex items-center gap-3 px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shrink-0" />
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col min-w-0 flex-1"
                        >
                            <span className="text-xs font-medium text-[var(--text-primary)] truncate">Sargun Kaur</span>
                            <span className="text-[10px] text-[var(--text-muted)] truncate">Pro Member</span>
                        </motion.div>
                    )}
                    {!collapsed && <ThemeToggle />}
                </div>
            </div>
        </motion.aside>
    )

    if (isMobile) {
        return (
            <>
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={onMobileClose}
                                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ x: -220 }}
                                animate={{ x: 0 }}
                                exit={{ x: -220 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed left-0 top-0 bottom-0 z-50 w-[220px]"
                            >
                                {sidebarContent}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </>
        )
    }

    return sidebarContent
}

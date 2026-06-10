"use client"

import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import Sidebar from "@/components/sidebar/Sidebar"
import MobileNav from "@/components/sidebar/MobileNav"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { useSidebar } from "@/hooks/useSidebar"

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const { collapsed, toggle, isMobile, mobileOpen, setMobileOpen } = useSidebar()

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
            {/* Desktop sidebar */}
            {!isMobile && (
                <Sidebar
                    collapsed={collapsed}
                    onToggle={toggle}
                    isMobile={false}
                    mobileOpen={false}
                    onMobileClose={() => { }}
                />
            )}

            {/* Mobile drawer sidebar */}
            {isMobile && (
                <Sidebar
                    collapsed={false}
                    onToggle={toggle}
                    isMobile={true}
                    mobileOpen={mobileOpen}
                    onMobileClose={() => setMobileOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile topbar */}
                {isMobile && (
                    <div className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-[var(--bg-base)]/80 backdrop-blur-md border-b border-[var(--border)]">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileOpen(true)}
                            className="text-[var(--text-muted)] hover:text-white"
                        >
                            <Menu size={20} />
                        </motion.button>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">Dashboard</span>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                        </div>
                    </div>
                )}

                <div className="p-4 md:p-6 pb-24 md:pb-6">
                    {children}
                </div>
            </main>

            {/* Mobile bottom nav */}
            <MobileNav />
        </div>
    )
}

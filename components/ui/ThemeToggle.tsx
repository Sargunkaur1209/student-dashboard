"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
    const [dark, setDark] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("theme")
        const isDark = stored ? stored === "dark" : true
        setDark(isDark)
        document.documentElement.classList.toggle("dark", isDark)
        document.documentElement.classList.toggle("light", !isDark)
    }, [])

    function toggle() {
        const next = !dark
        setDark(next)
        localStorage.setItem("theme", next ? "dark" : "light")
        document.documentElement.classList.toggle("dark", next)
        document.documentElement.classList.toggle("light", !next)
    }

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-colors"
        >
            <motion.div
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {dark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.div>
        </motion.button>
    )
}

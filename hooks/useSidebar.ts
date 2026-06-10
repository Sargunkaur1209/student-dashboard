"use client"

import { useState, useEffect } from "react"

export function useSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                setCollapsed(true)
            }
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return {
        collapsed,
        setCollapsed,
        isMobile,
        mobileOpen,
        setMobileOpen,
        toggle: () => setCollapsed((c) => !c),
    }
}

"use client"

import { motion } from "framer-motion"
import { GitBranch, Link2, Mail, Phone, ExternalLink } from "lucide-react"

const PROJECTS = [
    { label: "Rangla Punjab", href: "https://rangla-punjab-society-front.onrender.com/" },
    { label: "Busmate", href: "https://pcte-bus-mate.vercel.app/" },
    { label: "Event Scheduler", href: "http://event-reminder-sargun-kaur.vercel.app" },
    { label: "KDLF Event Organiser", href: "https://khalsadiladlifauj.vercel.app/" },
    { label: "Hire Me", href: "https://hireme-bay.vercel.app/" },
    { label: "Grand Mech Works", href: "https://grand-mech-works.vercel.app/" },
    { label: "Toy Store", href: "https://toy-store-8zyd.vercel.app/" },
    { label: "Car Showroom", href: "https://car-show-pied.vercel.app/" },
    { label: "Portfolio", href: "https://portfolio-pink-ten-94.vercel.app/" },
]

const SOCIALS = [
    {
        icon: Link2,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sargun-kaur-91524627b",
    },
    {
        icon: GitBranch,
        label: "GitHub",
        href: "https://github.com/Sargunkaur1209",
    },
]

function ProjectLink({ label, href }: { label: string; href: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="group inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
        >
            <ExternalLink
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="border-b border-transparent group-hover:border-[var(--accent)]/50 transition-colors duration-200">
                {label}
            </span>
        </motion.a>
    )
}

export default function Footer() {
    return (
        <footer className="mt-6 border-t border-[var(--border)] bg-[var(--bg-card)]">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-5">

                {/* Top row — name + socials */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">Created by Sargun Kaur</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Frontend Developer · Open to opportunities</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {SOCIALS.map(({ icon: Icon, label, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors duration-200 text-xs"
                            >
                                <Icon size={13} />
                                {label}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Projects grid */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3 font-medium">
                        Projects
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                        {PROJECTS.map((p) => (
                            <ProjectLink key={p.label} label={p.label} href={p.href} />
                        ))}
                    </div>
                </div>

                {/* Bottom row — contact */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-[var(--border)]">
                    <a
                        href="mailto:sargunkaur1209@gmail.com"
                        className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                        <Mail size={11} />
                        sargunkaur1209@gmail.com
                    </a>
                    <a
                        href="tel:9876323945"
                        className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                        <Phone size={11} />
                        9876323945
                    </a>
                    <span className="ml-auto text-[10px] text-[var(--text-muted)]">
                        © {new Date().getFullYear()} Sargun Kaur
                    </span>
                </div>

            </div>
        </footer>
    )
}

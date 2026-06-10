"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Palette, Shield, Save, Check } from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

function Section({ title, icon: Icon, children }: {
    title: string
    icon: React.ElementType
    children: React.ReactNode
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
        >
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--border)]">
                <Icon size={15} className="text-[var(--text-muted)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h2>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </motion.div>
    )
}

function Field({ label, description, children }: {
    label: string
    description?: string
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
                {description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>}
            </div>
            <div className="shrink-0">{children}</div>
        </div>
    )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <motion.button
            onClick={() => onChange(!value)}
            whileTap={{ scale: 0.95 }}
            className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${value ? "bg-[var(--accent)]" : "bg-white/10"}`}
            style={{ width: 40, height: 22 }}
        >
            <motion.span
                animate={{ x: value ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm"
                style={{ width: 16, height: 16, top: 3 }}
            />
        </motion.button>
    )
}

export default function SettingsView() {
    const [profile, setProfile] = useState({ name: "Sargun Kaur", email: "sargunkaur1209@gmail.com", bio: "Frontend Developer · Open to opportunities" })
    const [notifications, setNotifications] = useState({ email: true, push: false, deadlines: true, achievements: true })
    const [saved, setSaved] = useState(false)

    function handleSave() {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="space-y-4">

            {/* Profile */}
            <Section title="Profile" icon={User}>
                <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {profile.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{profile.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{profile.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">Pro Member</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { key: "name", label: "Full Name", type: "text" },
                        { key: "email", label: "Email", type: "email" },
                        { key: "bio", label: "Bio", type: "text" },
                    ].map(({ key, label, type }) => (
                        <div key={key}>
                            <label className="block text-xs text-[var(--text-muted)] mb-1">{label}</label>
                            <input
                                type={type}
                                value={profile[key as keyof typeof profile]}
                                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-[var(--text-muted)]"
                            />
                        </div>
                    ))}
                </div>
            </Section>

            {/* Appearance */}
            <Section title="Appearance" icon={Palette}>
                <Field label="Dark Mode" description="Toggle between dark and light theme">
                    <ThemeToggle />
                </Field>
                <Field label="Compact View" description="Reduce spacing for more content">
                    <Toggle value={false} onChange={() => { }} />
                </Field>
            </Section>

            {/* Notifications */}
            <Section title="Notifications" icon={Bell}>
                {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => (
                    <Field
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                        description={
                            key === "email" ? "Receive updates via email" :
                                key === "push" ? "Browser push notifications" :
                                    key === "deadlines" ? "Reminders before course deadlines" :
                                        "Badge and milestone notifications"
                        }
                    >
                        <Toggle value={val} onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))} />
                    </Field>
                ))}
            </Section>

            {/* Security */}
            <Section title="Security" icon={Shield}>
                <Field label="Password" description="Last changed 3 months ago">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => alert("Password change flow — connect to your auth provider.")}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors"
                    >
                        Change
                    </motion.button>
                </Field>
                <Field label="Two-Factor Auth" description="Add an extra layer of security">
                    <Toggle value={false} onChange={() => alert("2FA setup — connect to your auth provider.")} />
                </Field>
                <Field label="Sessions" description="Manage active sessions">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => alert("Session management — connect to your auth provider.")}
                        className="px-3 py-1.5 rounded-lg border border-red-900/40 text-xs text-red-400 hover:bg-red-950/20 transition-colors"
                    >
                        Sign out all
                    </motion.button>
                </Field>
            </Section>

            {/* Save */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
                {saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Changes</>}
            </motion.button>
        </div>
    )
}

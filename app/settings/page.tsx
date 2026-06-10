import DashboardShell from "@/components/DashboardShell"
import SettingsView from "@/components/settings/SettingsView"

export default function SettingsPage() {
    return (
        <DashboardShell>
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Manage your account and preferences.</p>
                </div>
                <SettingsView />
            </div>
        </DashboardShell>
    )
}

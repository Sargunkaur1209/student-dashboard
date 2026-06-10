import { Suspense } from "react"
import DashboardShell from "@/components/DashboardShell"
import AnalyticsView from "@/components/analytics/AnalyticsView"

export default function AnalyticsPage() {
    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-xl font-semibold text-[var(--text-primary)]">Analytics</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Your learning progress at a glance.</p>
                </div>
                <Suspense fallback={<div className="h-64 rounded-2xl skeleton" />}>
                    <AnalyticsView />
                </Suspense>
            </div>
        </DashboardShell>
    )
}

import { Suspense } from "react"
import DashboardShell from "@/components/DashboardShell"
import ScheduleView from "@/components/schedule/ScheduleView"

export default function SchedulePage() {
    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-xl font-semibold text-[var(--text-primary)]">Schedule</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Your weekly plan and upcoming deadlines.</p>
                </div>
                <Suspense fallback={<div className="h-64 rounded-2xl skeleton" />}>
                    <ScheduleView />
                </Suspense>
            </div>
        </DashboardShell>
    )
}

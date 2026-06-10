import { Suspense } from "react"
import DashboardShell from "@/components/DashboardShell"
import CoursesGrid from "@/components/courses/CoursesGrid"
import SkeletonCard from "@/components/dashboard/SkeletonCard"

function Skeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
    )
}

export default function CoursesPage() {
    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-xl font-semibold text-[var(--text-primary)]">My Courses</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Track your progress across all enrolled courses.</p>
                </div>
                <Suspense fallback={<Skeleton />}>
                    <CoursesGrid />
                </Suspense>
            </div>
        </DashboardShell>
    )
}

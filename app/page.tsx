import { Suspense } from "react"
import DashboardShell from "@/components/DashboardShell"
import HeroCard from "@/components/dashboard/HeroCard"
import CourseGrid from "@/components/dashboard/CourseGrid"
import ActivityTile from "@/components/dashboard/ActivityTile"
import SkeletonCard from "@/components/dashboard/SkeletonCard"
import StatsFetcher from "@/components/dashboard/StatsFetcher"
import ActivityFetcher from "@/components/dashboard/ActivityFetcher"
import DeadlinesFetcher from "@/components/dashboard/DeadlinesFetcher"
import Footer from "@/components/Footer"

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 h-16 skeleton" />
      ))}
    </div>
  )
}

function SidePanelSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 h-48 skeleton" />
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 h-48 skeleton" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-5 max-w-6xl mx-auto">

        {/* Hero */}
        <HeroCard />

        {/* Stats bar */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsFetcher />
        </Suspense>

        {/* Main bento grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Left — courses (spans 2 cols on xl) */}
          <div className="xl:col-span-2 space-y-5">
            <section id="courses-section">
              <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                Your Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Suspense fallback={<CoursesSkeleton />}>
                  <CourseGrid />
                </Suspense>
              </div>
            </section>

            {/* Activity heatmap */}
            <ActivityTile />
          </div>

          {/* Right — side panel */}
          <div className="space-y-5">
            <Suspense fallback={<SidePanelSkeleton />}>
              <DeadlinesFetcher />
              <ActivityFetcher />
            </Suspense>
          </div>
        </div>

      </div>
      <Footer />
    </DashboardShell>
  )
}

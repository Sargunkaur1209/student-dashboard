import SkeletonCard from "@/components/dashboard/SkeletonCard"

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Hero skeleton */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
                <div className="w-24 h-3 rounded skeleton mb-2" />
                <div className="w-48 h-6 rounded skeleton mb-4" />
                <div className="w-64 h-3 rounded skeleton mb-2" />
                <div className="w-56 h-3 rounded skeleton mb-5" />
                <div className="w-36 h-9 rounded-lg skeleton" />
            </div>

            {/* Courses skeleton */}
            <div>
                <div className="w-28 h-4 rounded skeleton mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>

            {/* Activity skeleton */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 h-40 skeleton" />
        </div>
    )
}

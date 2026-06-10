export default function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 overflow-hidden">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl skeleton" />
                <div className="w-10 h-5 rounded-lg skeleton" />
            </div>
            <div className="w-3/4 h-4 rounded skeleton mb-2" />
            <div className="w-1/2 h-3 rounded skeleton mb-5" />
            <div className="w-full h-1.5 rounded-full skeleton" />
        </div>
    )
}

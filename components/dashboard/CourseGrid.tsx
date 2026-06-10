import { getCourses } from "@/lib/supabase"
import CourseCard from "./CourseCard"
import type { Course } from "@/lib/types"

export default async function CourseGrid() {
    let courses: Course[] = []
    let error: string | null = null

    try {
        courses = await getCourses()
    } catch (e) {
        error = e instanceof Error ? e.message : "Failed to load courses"
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5 col-span-full">
                <p className="text-sm text-red-400">Could not load courses: {error}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Check your Supabase connection and environment variables.</p>
            </div>
        )
    }

    if (courses.length === 0) {
        return (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 col-span-full text-center">
                <p className="text-sm text-[var(--text-muted)]">No courses found. Add some in your Supabase dashboard.</p>
            </div>
        )
    }

    return (
        <>
            {courses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
            ))}
        </>
    )
}

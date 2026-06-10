import { getCourses } from "@/lib/supabase"
import CourseDetailCard from "./CourseDetailCard"

export default async function CoursesGrid() {
    let courses = []
    let error: string | null = null

    try {
        courses = await getCourses()
    } catch (e) {
        error = e instanceof Error ? e.message : "Failed to load courses"
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5">
                <p className="text-sm text-red-400">Could not load courses: {error}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {courses.map((course, i) => (
                <CourseDetailCard key={course.id} course={course} index={i} />
            ))}
        </div>
    )
}

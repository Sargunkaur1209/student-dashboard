import { getCourses, getUserStats } from "@/lib/supabase"
import AnalyticsClient from "./AnalyticsClient"

export default async function AnalyticsView() {
    const [courses, stats] = await Promise.allSettled([getCourses(), getUserStats()])
    return (
        <AnalyticsClient
            courses={courses.status === "fulfilled" ? courses.value : []}
            stats={stats.status === "fulfilled" ? stats.value : null}
        />
    )
}

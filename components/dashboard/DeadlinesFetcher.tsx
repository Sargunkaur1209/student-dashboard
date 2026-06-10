import { getCourses } from "@/lib/supabase"
import DeadlinesTile from "./DeadlinesTile"

export default async function DeadlinesFetcher() {
    try {
        const courses = await getCourses()
        return <DeadlinesTile courses={courses} />
    } catch {
        return null
    }
}

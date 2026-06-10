import { getCourses } from "@/lib/supabase"
import ScheduleClient from "./ScheduleClient"

export default async function ScheduleView() {
    let courses = []
    try {
        courses = await getCourses()
    } catch {
        // pass empty array — client handles it
    }
    return <ScheduleClient courses={courses} />
}

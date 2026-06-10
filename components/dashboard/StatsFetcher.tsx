import { getUserStats } from "@/lib/supabase"
import StatsBar from "./StatsBar"

export default async function StatsFetcher() {
    try {
        const stats = await getUserStats()
        return <StatsBar stats={stats} />
    } catch {
        return null // silently skip if table not seeded yet
    }
}

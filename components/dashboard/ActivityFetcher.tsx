import { getActivityFeed } from "@/lib/supabase"
import ActivityFeed from "./ActivityFeed"

export default async function ActivityFetcher() {
    try {
        const items = await getActivityFeed()
        return <ActivityFeed items={items} />
    } catch {
        return null
    }
}

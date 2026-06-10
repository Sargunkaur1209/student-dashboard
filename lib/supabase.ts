import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getCourses() {
    const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: true })
    if (error) throw new Error(error.message)
    return data
}

export async function getActivityFeed() {
    const { data, error } = await supabase
        .from("activity_feed")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)
    if (error) throw new Error(error.message)
    return data
}

export async function getUserStats() {
    const { data, error } = await supabase
        .from("user_stats")
        .select("*")
        .limit(1)
        .single()
    if (error) throw new Error(error.message)
    return data
}

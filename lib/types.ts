export interface Course {
    id: string
    title: string
    progress: number
    icon_name: string
    total_modules: number
    completed_modules: number
    due_date: string | null
    created_at: string
}

export interface ActivityItem {
    id: string
    label: string
    detail: string | null
    icon_name: string
    created_at: string
}

export interface UserStats {
    id: string
    total_hours: number
    xp_points: number
    completion_rate: number
    certificates: number
    updated_at: string
}

export interface NavItem {
    label: string
    icon: string
    href: string
}

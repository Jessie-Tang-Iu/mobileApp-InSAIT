export interface PostItem {
    id?: string;
    event_name: string;
    organization_name: string;
    start_time: string;
    end_time: string;
    location: string;
    cost: number;
    details: string;
};

export interface UserProfile {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_role: boolean;
}

export interface RegisteredEvent {
    id?: number;
    profile_email: string;
    post_id: string;
}
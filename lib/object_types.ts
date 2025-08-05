export interface PostItem {
    id?: string;
    event_name: string;
    organization_name: string;
    start_time: Date;
    end_time: Date;
    location: string;
    cost: string;
    details: string;
    post_url: string;
};

export interface UserProfile {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_role: boolean;
    picture_url: string;
}

export interface RegisteredEvent {
    id?: number;
    profile_email: string;
    post_id: string;
}
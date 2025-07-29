export interface PostItem {
    id: string;
    eventName: string;
    organizationName: string;
    startTime: string;
    endTime: string;
    location: string;
    cost: number;
    details: string;
};

export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_role: boolean;
}
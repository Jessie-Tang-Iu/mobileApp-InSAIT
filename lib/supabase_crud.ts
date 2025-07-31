import { supabase } from "./supabase";
import { UserProfile, PostItem, RegisteredEvent } from "./object_types";

// const table_name = 'user_profiles';

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('id', {ascending: true});
    
    if (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
    return data;
}

export async function getUserById(id: number) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error(`Error fetching user with ID ${id}: `, error);
        throw error;
    }
    return data;
}

export async function addUser(item: UserProfile) {
    const { data, error } = await supabase
        .from('user_profiles')
        .insert([item]);
    
    if (error) {
        console.error("Error registering user: ", error);
        throw error;
    }
    return data;
}

export async function updateUser(id: number, user: Partial<UserProfile>) {
    console.log("Updating user:", user);
    const { data, error } = await supabase
        .from('user_profiles')
        .update(user)
        .eq("id", id)
        .select();
        
    console.log("Supabase response:", data);
    if (error) {
        console.error(`Error updating user with ID ${id}: `, error);
        throw error;
    }
    return data;
}

export async function deleteUser(id: number) {
    const { data, error } = await supabase
        .from('user_profiles')
        .delete()
        .eq("id", id);

    if (error) {
        console.error(`Error deleting item with ID ${id}: `, error);
        throw error;
    }
    return data;
}

export async function getAllPosts() {
    const { data, error } = await supabase
        .from('post_events')
        .select('*')
        .order('id', {ascending: true});
    
    if (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
    return data;
}

export async function getPostById(id: number) {
    const { data, error } = await supabase
        .from('post_events')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error(`Error fetching post with ID ${id}: `, error);
        throw error;
    }
    return data;
}

export async function addPost(post: PostItem) {
    const { data, error } = await supabase
        .from('post_events')
        .insert(post);
    
    if (error) {
        console.error("Error adding post: ", error);
        throw error;
    }
    return data;
}

export async function getAllRegisteredEvents() {
    const { data, error } = await supabase
        .from('registered_events')
        .select('*')
        .order('id', {ascending: true});
    
    if (error) {
        console.error('Error fetching registered users for events: ', error);
        throw error;
    }
    return data;
}

export async function getRegisteredEventByEmail(email: string) {
    const { data, error } = await supabase
        .from('registered_events')
        .select('*')
        .eq('profile_email', email);
    
    if (error) {
        console.error(`Error fetching registered event with email ${email}: `, error);
        throw error;
    }
    return data;
}

export async function registerEvent(post: RegisteredEvent) {
    const { data, error } = await supabase
        .from('registered_events')
        .insert(post);
    
    if (error) {
        console.error("Error registering event: ", error);
        throw error;
    }
    return data;
}

export async function unregisterEvent(id: number) {
    const { data, error } = await supabase
        .from('registered_events')
        .delete()
        .eq("id", id);

    if (error) {
        console.error(`Error unregistering event with ID ${id}: `, error);
        throw error;
    }
    return data;
}
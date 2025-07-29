import { supabase } from "./supabase";
import { UserProfile } from "./object_types";

const table_name = 'user_profiles';

export async function getAllUsers() {
    const { data, error } = await supabase
        .from(table_name)
        .select('*')
        .order('id', {ascending: true});
    
    if (error) {
        console.error('Error fetching items: ', error);
        throw error;
    }
    return data;
}

export async function getUserById(id: number) {
    const { data, error } = await supabase
        .from(table_name)
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
        .from(table_name)
        .insert([item]);
    
    if (error) {
        console.error("Error registering user: ", error);
        throw error;
    }
    return data;
}

export async function updateUser(id: number, user: UserProfile) {
    const { data, error } = await supabase
        .from(table_name)
        .update(user)
        .eq("id", id);
    
    if (error) {
        console.error(`Error updating user with ID ${id}: `, error);
        throw error;
    }
    return data;
}

export async function deleteUser(id: number) {
    const { data, error } = await supabase
        .from(table_name)
        .delete()
        .eq("id", id);

    if (error) {
        console.error(`Error deleting item with ID ${id}: `, error);
        throw error;
    }
    return data;
}
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { UserProfile } from "../lib/object_types";

interface UserContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const router = useRouter();

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        Alert.alert("Session expired", "Please sign in again.");
        router.push('/sign_in');
        throw new Error("");
    }
    return context;
};

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children } : UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            const {data : {session}} = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                router.push('/sign_in');
            }
            setIsLoading(false);
        };

        const { data : {subscription} } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id);
                } else { 
                    setProfile(null);
                }
            });

        initializeAuth();

        return () => { subscription.unsubscribe(); };

    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from("user_profiles")
                .select("id, first_name, last_name, email, admin_role, picture_url")
                .eq("id", userId)
                .single();
            
            if (error) {
                console.error("Error fetching profile: ", error.message);
                return;
            }
            setProfile(data);
        } catch (error) {
            console.error("Unexpected error fetching profile: ", error);
        }
    };

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({email, password});
            if (error) {
                throw new Error(error.message);
            }
            setSession(data.session);
            setUser(data.user);
            await fetchProfile(data.user.id);
        } catch (error) {
            console.error("Sign-in error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            const {error} = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
            setSession(null);
            setUser(null);
            setProfile(null);
        } catch (error) {
            console.error("Sign-out error: ", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!user) {
            throw new Error("No user is signed in.");
        }
        setIsLoading(true);
        try {
            const {error} = await supabase
                .from("user_profiles")
                .update(updates)
                .eq("id", user.id);
            
            if (error) {
                throw new Error(error.message);
            }
            setProfile((prev) => (prev ? { ...prev, ...updates } : null));
        } catch (error) {
            console.error("Update profile error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue: UserContextType = { user, session, profile, isLoading, signIn, signOut, updateProfile };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
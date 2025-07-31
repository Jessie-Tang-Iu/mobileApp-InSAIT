import { StyleSheet, Text, View, Alert } from 'react-native';
import Navbar from '../components/navbar';
import { constantStyles } from '../components/constants';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '../components/post';
import { useRouter } from 'expo-router';
import { getSession } from '../lib/supabase_auth';
import { getAllPosts } from '../lib/supabase_crud';
import { useUserContext } from '../context/userContext';
import { PostItem } from '../lib/object_types';
import SupabaseAuth from "../components/supabase_signin";

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_role: boolean;
}

export default function App() {

    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();
    const {username, setEmail} = useUserContext();

    const getCurrentSession = async () => {
        try {
            const session = await getSession();
            setEmail(session?.user?.email || '');
            if (!session) { 
                Alert.alert("Session expired", "Please sign in again.")
                router.push('/sign_in');
            }
        } catch (error) {
            console.error("Error fetching session:", error);
            Alert.alert("Error", "Failed to fetch session. Please sign in again.")
        }
    };

    const fetchAllPosts = async () => {
        try {
            setLoading(true);
            const data = await getAllPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching all posts: ', error);
            Alert.alert('Error ', 'Failed to load all posts data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
        getCurrentSession();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1, paddingTop: 50, backgroundColor: '#263F75' }}>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi, {username}</Text>
                    <Text style={styles.text}>Find the upcoming events</Text>
                    <>
                        <TextInput
                            placeholder="search"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.search}
                        />
                    </>
                </View>
                <View style={[styles.content]}>
                    <ScrollView>
                        <Post posts={posts} />
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Navbar />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        padding: 20,
        backgroundColor: '#263F75',
        width: '100%',
    },
    headerText: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 5,
    },
    search: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        color: '#000',
        marginBottom: 10,
    },
    content: {
        flex: 1,
        color: '#fff',
        fontSize: 15,
        lineHeight: 20,
        height: 460,
    },
    footer: {
        backgroundColor: '#263F75',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
});

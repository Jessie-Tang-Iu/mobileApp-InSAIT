import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Navbar from "../components/navbar";
import Post from "../components/post";
import posts from "../lib/posts.json";
import { useUserContext } from "../context/userContext";
import users from "../lib/user.json";
import { PostItem } from "../lib/object_types";

export default function Profile() {

    const { username, email, setEmail, setUserName } = useUserContext();
    const [registeredEvent, setRegisteredEvent] = useState<PostItem[]>([]);
  
    const router = useRouter();
    
    const handleLogout = () => {
        setEmail("");
        setUserName("Guest");
        router.push('../sign_in');
    };

    useEffect(() => {
        const user = users.find((cred) => cred.email === email);
        if (user) {
            const matchedEvents = posts.filter((event) =>
                user.registeredEvent.includes(event.id)
            );
            setRegisteredEvent(matchedEvents);
        }
    }, []);

    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{username}</Text>
                    <Text style={styles.text}>{email}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.headerContent}>My Registered Event</Text>
                    <ScrollView>
                        <Post posts={registeredEvent} username={username} />
                    </ScrollView>
                </View>
                <View style={styles.profileFunctions}>
                    <TouchableOpacity><Text style={styles.profileText}>General</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.profileText}>Edit Profile</Text></TouchableOpacity>
                    <TouchableOpacity>
                        <Text 
                            style={styles.profileText}
                            onPress={handleLogout}
                        >Log out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Navbar username={username} />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#263F75',
        width: '100%',
    },
    headerText: {
        // paddingTop: 20,
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
        height: 367,
    },
    headerContent: {
        paddingVertical: 15,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    profileFunctions: {
        borderTopWidth: 1,
        padding: 10,
    },
    profileText: {
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    footer: {
        backgroundColor: '#263F75',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
});
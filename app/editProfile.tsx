import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Navbar from "../components/navbar";
import { useUserContext } from "../context/userContext";
import { getAllUsers, getUserById, deleteUser, addUser, updateUser, getRegisteredEventByEmail } from '../lib/supabase_crud';
import { signUp } from "../lib/supabase_auth";
import { getSession } from '../lib/supabase_auth';
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { Feather } from '@expo/vector-icons';
import { UserProfile } from "../lib/object_types";



export default function EditProfile() {

    const { username, email, setEmail, setUserName } = useUserContext();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [id, setId] = useState<number>();
    const [firstName, setFirstName] = useState<string>(username);
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState("");
    const [oldEmail, setOldEmail] = useState(email);
    const [profileURL, setProfileURL] = useState("");

    const icon = require('../assets/icon.png');
    
    const [reminderText, setReminderText] = useState("");

    const router = useRouter();

    const handleLogout = () => {
        setEmail("");
        setUserName("Guest");
        router.push('../sign_in');
    };

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

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching all users: ', error);
            Alert.alert('Error ', 'Failed to load all users data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
        getCurrentSession();
    }, []);

    useEffect(() => {
        const getProfile = () => {
            if (!email) return console.log("email is null");
            const thisProfile = users.find((user) => user.email === email);
            if (thisProfile) {
                setId(thisProfile.id);
                setFirstName(thisProfile.first_name);
                setLastName(thisProfile.last_name);
                setProfile(thisProfile);
                setProfileURL(thisProfile.picture_url);
            }
        };
        getProfile();
    }, [users])

    useEffect(() => {
        setFirstName(profile?.first_name || "Guest");
        setLastName(profile?.last_name || "Guest");
    }, [profile])

    useEffect(() => {
        if (email !== oldEmail) {
            setReminderText("If you need to change your email, password is REQUIRED!");
        } else {
            setReminderText("If you want to keep the old password, please leave this field as EMPTY or NULL.");
        }
    })

    const handleSubmit = async () => {
        try{
            const existingUser = await getUserById(Number(id));

            const NewProfile = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                admin_role: profile?.admin_role || false,
                picture_url: profileURL
            };

            if (email=== oldEmail && password === "" )
            {
                console.log("Update User Name only. Id: ", existingUser.id);

                const UpdatedUser = {
                    first_name: firstName,
                    last_name: lastName,
                    picture_url: profileURL,
                };

                await updateUser(Number(id), UpdatedUser);
                Alert.alert(
                    'Success', 
                    `User ${UpdatedUser.first_name}'s profile is updated!\nPlease Log In Again!`,
                    [
                        {
                            text: 'OK',
                            onPress: handleLogout,
                        }
                    ]
                );

            } else {

                if (password === "") {
                    Alert.alert('Error', 'Password cannot be NULL');
                    console.log("Password cannot be empty.")
                    return;
                }

                console.log("Existing User UUID: ", existingUser.profile_id);

                await supabase.auth.admin.deleteUser(existingUser.profile_id);
                await deleteUser(Number(id));
                console.log("Deleting user with ID:", id);
                await signUp(email, password);
                await addUser(NewProfile);
                console.log("Adding user:", NewProfile);

                const registeredEvent = getRegisteredEventByEmail(oldEmail);
                console.log("Registered Event: ", registeredEvent);

                await supabase
                .from('registered_events')
                .update({ profile_email: email })
                .eq('profile_email', oldEmail);

                Alert.alert(
                    'Success', 
                    `User ${NewProfile.first_name}'s profile is updated!\nPlease Log In Again!`,
                    [
                        {
                            text: 'OK',
                            onPress: handleLogout,
                        }
                    ]
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update user.');
            console.error(error);
        }
    }

    return(
        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image source={profileURL ? { uri: profileURL } : icon} style={styles.image} />
                        {/* <TouchableOpacity>
                            <Text style={styles.imageButtonText}>Edit picture</Text>
                        </TouchableOpacity> */}
                    </View>
                    {/* <View style={styles.hr} /> */}
                    <Text style={styles.inputText}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <Text style={styles.inputText}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text style={styles.reminderText}>{reminderText}</Text>
                    <Text style={styles.inputText}>Profile Pic URL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="https://example.com"
                        value={profileURL}
                        onChangeText={setProfileURL}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Navbar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 658,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    image: {
        borderRadius: 50,
        width: 130,
        height: 130,
        // margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButtonText: {
        color: '#2782D8',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hr: {
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        marginVertical: 20,
        width: '100%',
    },
    inputText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        marginRight: 180,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        minWidth: 300,
        maxWidth: 400,
    },
    reminderText: {
        fontSize: 15,
        marginBottom: 20,
        color: 'red',
    },
    button: {
        backgroundColor: '#0284c7',
        height: 50,
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        minWidth: 100,
        maxWidth: 300,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
        alignItems: "flex-end",
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#263F75',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    submitButton: {
        backgroundColor: '#263F75',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 150,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 50,
    },
});
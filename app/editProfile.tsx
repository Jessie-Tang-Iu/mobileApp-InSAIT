import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Navbar from "../components/navbar";
import { useUserContext } from "../context/userContext";
import { getAllUsers, getUserById, deleteUser, addUser, updateUser } from '../lib/supabase_crud';
import { getSession } from '../lib/supabase_auth';
import { useLocalSearchParams, useRouter } from "expo-router";

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_role: boolean;
}

export default function EditProfile() {

    const { username, email, setEmail, setUserName } = useUserContext();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [id, setId] = useState<number>();
    const [firstName, setFirstName] = useState<string>(username);
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState("");

    const router = useRouter();

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
            }
        };
        getProfile();
    }, [users])

    useEffect(() => {
        setFirstName(profile?.first_name || "Guest");
        setLastName(profile?.last_name || "Guest");
    }, [profile])

    const handleSubmit = async () => {
        try{
            const existingUser = await getUserById(Number(id));

            const UpdatedUser = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                admin_role: profile?.admin_role || false
            };

            console.log("Updating user with ID:", id);
            console.log("Sending update:", UpdatedUser);
            await updateUser(Number(id), UpdatedUser);
            Alert.alert('Success', `User ${UpdatedUser.first_name} updated!`);
        } catch (error) {
            Alert.alert('Error', 'Could not update user.');
            console.error(error);
        }
    }

    return(
        <View>
            <View style={styles.container}>
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
                <Text style={styles.inputText}>New Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.inputText}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Navbar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 658,
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
    button: {
        backgroundColor: '#0284c7',
        height: 50,
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        maxWidth: 300,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#263F75',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    }
});
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { constantStyles } from '../components/constants';
import { useEffect, useState } from "react";
import users from "../lib/user.json";
import { useUserContext } from "../context/userContext";

export default function Navbar() {

    const router = useRouter();
    const [userType, setUserType] = useState("");

    const { email } = useUserContext();

    useEffect(() => {
        const user = users.find((cred) => cred.email.toLowerCase() === email.toLowerCase());
        if(user) {
            setUserType(user.userType)
        }
    }, [email]);

    if (userType === "admin") {
        return (
            <View style={constantStyles.footer}>
                <TouchableOpacity onPress={() => router.push('/')}><Feather name='home' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../calendarPage')}><Feather name='calendar' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../addEvent')}><Feather name='plus-square' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../profile')}><Feather name='user' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={constantStyles.footer}>
                <TouchableOpacity onPress={() => router.push('/')}><Feather name='home' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../calendarPage')}><Feather name='calendar' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../profile')}><Feather name='user' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            </View>
        );
    }

    
}
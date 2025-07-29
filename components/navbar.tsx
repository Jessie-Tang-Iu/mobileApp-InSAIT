import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { constantStyles } from '../components/constants';
import { useEffect, useState } from "react";
import users from "../lib/user.json";
import { useUserContext } from "../context/userContext";

interface NavbarProps {
    username: string;
}

export default function Navbar({ username }: NavbarProps) {

    const router = useRouter();
    const [userType, setUserType] = useState("");

    const {email} = useUserContext();

    useEffect(() => {
        const user = users.find((cred) => cred.email === email);
        if(user) {
            setUserType(user.userType)
        }
    }, []);

    if (userType === "admin") {
        return (
            <View style={constantStyles.footer}>
                <TouchableOpacity onPress={() => router.push({ pathname: `/`, params: { username }})}><Feather name='home' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: `../calendarPage`, params: { username }})}><Feather name='calendar' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: `../addEvent`, params: { username } })}><Feather name='plus-square' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: '../profile', params: { username } })}><Feather name='user' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={constantStyles.footer}>
                <TouchableOpacity onPress={() => router.push({ pathname: `/`, params: { username }})}><Feather name='home' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: `../calendarPage`, params: { username }})}><Feather name='calendar' style={constantStyles.tabButton}></Feather></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: '../profile', params: { username } })}><Feather name='user' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            </View>
        );
    }

    
}
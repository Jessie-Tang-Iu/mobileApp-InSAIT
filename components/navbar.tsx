import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { constantStyles } from '../components/constants';



export default function Navbar() {

    const router = useRouter();

    return (
        <View style={constantStyles.footer}>
            <TouchableOpacity onPress={() => router.push(`/`)}><Feather name='home' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`/`)}><Feather name='calendar' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`/`)}><Feather name='plus-square' style={constantStyles.tabButton}></Feather></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`../profile`)}><Feather name='user' style={constantStyles.tabButton}></Feather></TouchableOpacity>
        </View>
    );
}
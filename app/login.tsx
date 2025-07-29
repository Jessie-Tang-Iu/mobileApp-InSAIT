import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    return(
        <ImageBackground 
            source={require('../assets/sait-background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
        <View style={styles.container}>
            <Text style={styles.headerText}>Welcome!</Text>
            <Text style={styles.text}>Login to your account</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.search}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.search}
                />
                <TouchableOpacity onPress={() => router.push(`/`)} style={styles.button}><Text style={styles.buttonText}>Sign in</Text></TouchableOpacity>
            <View 
            style={{flexDirection: 'row'}}>
                <Text style={styles.profileText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push(`../signup`)}><Text style={styles.signUpText}>Sign Up here</Text></TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    header: {
        padding: 20,
        backgroundColor: '#263F75',
        width: '100%',
    },
    headerText: {
        paddingTop: 20,
        color: '#000',
        fontSize: 50,
        fontWeight: 'bold',
    },
    text: {
        color: '#000',
        fontSize: 20,
        marginBottom: 5,
    },
    search: {
        width: 200,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        color: '#000',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    profileText: {
        fontSize: 15,
        paddingVertical: 10,
    },
    signUpText: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: '#578FC3',
    },
    button: {
        backgroundColor: '#4CB3E7',
        borderRadius: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
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
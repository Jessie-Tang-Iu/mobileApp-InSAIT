import React, { useEffect, useState } from "react";
import { ImageBackground, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import SupabaseAuth from "../components/supabase_signin";

export default function SignIn() {
    return (
        <ImageBackground 
            source={require('../assets/sait-background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>Please sign in to continue</Text>
                <SupabaseAuth />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        paddingTop: 20,
        color: '#000',
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        marginBottom: 5,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

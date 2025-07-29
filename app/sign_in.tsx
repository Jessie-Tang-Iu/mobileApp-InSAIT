import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { signIn, signUp } from "../lib/supabase_auth";
import SupabaseAuth from "../components/supabase_signin";

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
            <SupabaseAuth />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
});

import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/navbar';
import { constantStyles } from '../components/constants';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '../components/post';
import posts from "../lib/posts.json";

export default function App() {

    const [searchText, setSearchText] = useState("");

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi, UserName</Text>
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
                <View style={styles.content}>
                    <ScrollView>
                        {/* <Text>Content will be in here</Text> */}
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
        paddingTop: 20,
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

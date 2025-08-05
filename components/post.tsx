import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { constantStyles } from './constants';
import { PostItem } from "../lib/object_types";
import { useLocalSearchParams, useRouter } from "expo-router";

type PostProps = {
    posts: PostItem[];
};

export default function Post({posts}: PostProps) {

    const icon = require('../assets/icon.png');
    const router = useRouter();

    return(
        <View style={styles.post}>
            {posts.map((post, index) => (
                <TouchableOpacity key={index} onPress={() => router.push(`/event/${post.id}`)}>
                    <View style={styles.container} key={index}>
                        <Image source={post.post_url ? { uri: post.post_url } : icon} style={styles.image} />
                        <Text style={styles.text}>{post.event_name}</Text>
                        <Text style={styles.text}>{post.organization_name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        
    )
}

const styles = StyleSheet.create({
    post: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    container: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        width: 350,
        margin: 20,
    },
    image: {
        width: '100%',
        height: 130,
        borderRadius: 10,
    },
    text: {
        padding: 10,
    }
})
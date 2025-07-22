import { Image, StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { constantStyles } from './constants';


export default function Post() {

    const icon = require('../assets/icon.png');

    return(
        <View style={styles.post}>
            <View style={styles.container}>
                <Image source={icon} style={styles.image} />
                <Text style={styles.text}>Friendly Football Game</Text>
                <Text style={styles.text}>Afro-Caribbean Student Club</Text>
            </View>
            <View style={styles.container}>
                <Image source={icon} style={styles.image} />
                <Text style={styles.text}>Friendly Football Game</Text>
                <Text style={styles.text}>Afro-Caribbean Student Club</Text>
            </View>
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
    },
    text: {
        padding: 10,
    }
})
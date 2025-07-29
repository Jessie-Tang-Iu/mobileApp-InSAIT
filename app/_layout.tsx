import { Stack } from 'expo-router';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { constantStyles } from '../components/constants';
import { View, Image } from 'react-native';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <View style={{flex: 1}}>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: 'Home',
                            headerStyle: { backgroundColor: '#f4511e' },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontWeight: 'bold' },
                        }}
                    />
                </Stack> 
            </View>
        </SafeAreaProvider>
    );
}
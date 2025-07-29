import { Stack } from 'expo-router';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { constantStyles } from '../components/constants';
import { View, Image } from 'react-native';
import { UserContextProvider } from '../context/authContext';
import { UserProvider } from '../context/userContext';

export default function Layout() {
    return (
        <UserProvider>
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
                        <Stack.Screen
                            name="sign_in"
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack>
                </View>
            </SafeAreaProvider>
        </UserProvider>
    );
}
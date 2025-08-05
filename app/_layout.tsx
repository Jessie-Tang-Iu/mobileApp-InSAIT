import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
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
                                headerBackVisible: false,
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="event/[postId]"
                            options={{
                                title: 'Event Detail',
                            }}
                        />
                        <Stack.Screen 
                            name="calendarPage"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen 
                            name="addEvent"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen 
                            name="profile"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen 
                            name="editProfile"
                            options={{
                                title: "Edit Profile",
                                headerTitleStyle: {fontSize: 25, fontWeight: 'bold', color: '#263F75'},
                                headerTitleAlign: 'center',
                                // headerBackTitleVisible: false,
                                headerShown: true,
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
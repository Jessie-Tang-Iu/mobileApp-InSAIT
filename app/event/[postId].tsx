import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import posts from '../../lib/posts.json';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import users from "../../lib/user.json";
import { useUserContext } from '../../context/userContext';

export default function EventDetails() {

  const params = useLocalSearchParams();
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;

  const {username, email} = useUserContext();

  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const post = posts.find(p => p.id === postId);
  const icon = require('../../assets/icon.png');

  if (!post) {
    return (
      <View>
        <Text>Post not found</Text>
      </View>
    );
  }

  const start = new Date(post.startTime);
  const end = new Date(post.endTime);

  // Format times (you can adjust the locale/time format)
  const formattedStart = start.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedEnd = end.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const foundUser = users.find((cred) => cred.email.toLowerCase() === email.toLowerCase());
    if (foundUser && typeof postId === 'string') {
      setUser(foundUser);
      setIsRegistered(foundUser.registeredEvent.includes(postId));
    }
  }, [username, postId]);

  const handleRegister = () => {
    if (!user || isRegistered) return;

    // Simulate registering by updating local state
    const updatedUser = {
      ...user,
      registeredEvent: [...user.registeredEvent, postId],
    };

    setUser(updatedUser);
    setIsRegistered(true);
    Alert.alert('Success', 'You have successfully registered for this event!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.main}>
          <Image source={icon} style={styles.image} />
          <Text style={styles.headerText}>{post.eventName}</Text>
          <Text>{formattedStart} - {formattedEnd}</Text>
          <Text>Hosted By {post.organizationName}</Text>
          <Text></Text>
          <Text>Location: {post.location}</Text>
          <Text>Cost: {post.cost}</Text>
          <Text style={styles.headerText}>Details:</Text>
          <Text>{post.details}</Text>
        </View>
      </ScrollView>
      <View style={styles.registerBox}>
        <Text style={styles.headerText}>Register Me</Text>
        {isRegistered ? (
          <Text style={{ color: 'green', fontSize: 16, paddingVertical: 10 }}>
            ✅ You are already registered.
          </Text>
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  main: {
    paddingTop: 50,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  headerText: {
    paddingTop: 20,
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  registerBox: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#EB5823',
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#263F75',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});


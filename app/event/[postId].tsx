import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import posts from '../../lib/posts.json';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import users from "../../lib/user.json";
import { useUserContext } from '../../context/userContext';
import { PostItem, RegisteredEvent } from '../../lib/object_types';
import { getAllPosts } from '../../lib/supabase_crud';


export default function EventDetails() {

  const params = useLocalSearchParams();
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;

  const {email, register} = useUserContext();

  const [post, setPost] = useState<PostItem | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching all posts: ', error);
      Alert.alert('Error ', 'Failed to load all posts data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllPosts();
  }, [])

  useEffect(() => {
    const thisPost = posts.find(p => p.id == postId);
    if (thisPost) {
      setPost(thisPost);
    }
  }, [posts]);

  useEffect(() => {
    const thisPost = register.find((cred) => cred.id == postId);
    if (thisPost) {
      setIsRegistered(true);
    }
  }, [post])

  const icon = require('../../assets/icon.png');

  if (!post) {
    return (
      <View style={{alignItems: "center", paddingTop: 20}}>
        <Text>{postId}</Text>
        <Text style={{fontSize: 25}}>Post not found</Text>
      </View>
    );
  }

  const start = new Date(post.start_time);
  const end = new Date(post.end_time);

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

  const handleRegister = () => {
    if (!user || isRegistered) return;
    // updateUserFile();
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
          <Text style={styles.headerText}>{post.event_name}</Text>
          <Text>{formattedStart} - {formattedEnd}</Text>
          <Text>Hosted By {post.organization_name}</Text>
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
    // paddingTop: 50,
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


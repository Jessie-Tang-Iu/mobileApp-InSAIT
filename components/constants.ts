import { StyleSheet } from 'react-native';

export const constantStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  button2: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 3,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    banner: {
      width: '100%',
      height: '25%',
      backgroundColor: '#f5f5f5',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
});

export const welcome_message = "Welcome to my application!";
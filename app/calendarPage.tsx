import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars'; 
import Navbar from '../components/navbar';

export default function CalendarPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Calendar</Text>
      </View>
      <View style={styles.calendar}>
        <Calendar
          current={'2025-07-01'}
          onDayPress={(day) => console.log('selected day', day)}
          markedDates={{
            '2025-07-22': { selected: true, marked: true, selectedColor: 'blue' },
          }}
        />
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
  },
  header: {
    padding: 20,
    backgroundColor: '#263F75',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    // paddingTop: 20,
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  calendar: {
    flex: 1,
    height: 549,
  },
  footer: {
    backgroundColor: '#263F75',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

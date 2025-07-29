import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Navbar from '../components/navbar';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import users from '../lib/user.json';
import events from '../lib/posts.json';
import { useUserContext } from '../context/userContext';

export default function CalendarPage() {

  const {email} = useUserContext();

  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<typeof events>([]);
  const [selectedEvents, setSelectedEvents] = useState<typeof events>([]);

  useEffect(() => {
    const user = users.find((cred) => cred.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const userEventIds = user.registeredEvent;

      const filteredEvents = events.filter((event) =>
        userEventIds.includes(event.id)
      );
      setUserEvents(filteredEvents);

      const newMarkedDates: { [key: string]: any } = {};
      filteredEvents.forEach((event) => {
        const date = event.startTime.split('T')[0];
        newMarkedDates[date] = {
          marked: true,
          dotColor: 'blue',
        };
      });

      setMarkedDates(newMarkedDates);
    }
  }, []);

  const handleDayPress = (day: any) => {
    const selected = day.dateString;
    setSelectedDate(selected);

    const eventsOnDay = userEvents.filter(
      (event) => event.startTime.split('T')[0] === selected
    );
    setSelectedEvents(eventsOnDay);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Calendar</Text>
      </View>

      <View style={styles.calendar}>
        <Calendar
          current={'2025-07-01'}
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            ...(selectedDate
              ? {
                  [selectedDate]: {
                    ...(markedDates[selectedDate] || {}),
                    selected: true,
                    selectedColor: 'lightblue',
                  },
                }
              : {}),
          }}
        />
      </View>

      <ScrollView style={styles.eventDetails}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.eventName}</Text>
              <Text style={styles.eventText}>Location: {event.location}</Text>
              <Text style={styles.eventText}>
                Time: {event.startTime} - {event.endTime}
              </Text>
            </View>
          ))
        ) : (
          selectedDate && (
            <Text style={styles.noEventText}>No events on this day</Text>
          )
        )}
      </ScrollView>

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
    height: 350,
  },
  eventDetails: {
    flex: 1,
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#263F75',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  eventText: {
    fontSize: 13,
    color: '#fff',
    paddingVertical: 3,
  },
  noEventText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  footer: {
    backgroundColor: '#263F75',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

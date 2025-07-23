import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Navbar from "../components/navbar";
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';



export default function AddEvent() {
    
    const [eventName, setEventName] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("");
    const [details, setDetails] = useState("");

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onStartChange = (event: any,selectedDate: Date) => {
        setShowStartPicker(Platform.OS === 'ios');
        if (selectedDate) {
        setStartTime(selectedDate);
        }
    };

    const onEndChange = (event: any,selectedDate: Date) => {
        setShowEndPicker(Platform.OS === 'ios');
        if (selectedDate) {
        setEndTime(selectedDate);
        }
    };


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create New Event</Text>
            </View>
            <View style={styles.content}>
                <ScrollView>
                    <Text style={styles.inputLabel}>Event Name</Text>
                    <TextInput
                        placeholder="Event Name"
                        value={eventName}
                        onChangeText={setEventName}
                        style={styles.input}
                    />
                    <Text style={styles.inputLabel}>Organizer Name</Text>
                    <TextInput
                        placeholder="Organizer Name"
                        value={organizerName}
                        onChangeText={setOrganizerName}
                        style={styles.input}
                    />
                    <Text style={styles.inputLabel}>Start Time</Text>
                    <Button title={startTime.toLocaleString()} onPress={() => setShowStartPicker(true)} />
                    {showStartPicker && (
                        <DateTimePicker
                        value={startTime}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={onStartChange}
                        />
                    )}
                    <Text style={styles.inputLabel}>End Time</Text>
                    <Button title={endTime.toLocaleString()} onPress={() => setShowEndPicker(true)} />
                    {showEndPicker && (
                        <DateTimePicker
                        value={endTime}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={onEndChange}
                        />
                    )}
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                        style={styles.input}
                    />
                    <Text style={styles.inputLabel}>Cost</Text>
                    <TextInput
                        placeholder="Cost"
                        value={cost}
                        onChangeText={setCost}
                        style={styles.input}
                    />
                    <Text style={styles.inputLabel}>Details</Text>
                    <TextInput
                        placeholder="Details"
                        value={details}
                        onChangeText={setDetails}
                        style={[styles.input, styles.textArea]}
                        multiline
                    />
                </ScrollView>
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
        alignItems: 'center',
    },
    header: {
        padding: 20,
        backgroundColor: '#263F75',
        width: '100%',
    },
    headerText: {
        paddingTop: 20,
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
    },
    content: {
        paddingBottom: 10,
        color: '#fff',
        fontSize: 15,
        lineHeight: 20,
        height: 549,
        width: '100%',
    },
    inputLabel: {
        paddingHorizontal: 28,
        fontSize: 18,
        marginTop: 30,
    },
    input: {
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingHorizontal: 22,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    footer: {
        backgroundColor: '#263F75',
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
})
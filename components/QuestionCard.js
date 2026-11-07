import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const QuestionCard = ({ image, question, options, selectedValue, onValueChange, onHintPress }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.questionRow}>
                <Ionicons name="location-sharp" size={16} color="#e74c3c" />
                <Text style={styles.questionText}>{question}</Text>
            </View>

            <TouchableOpacity onPress={onHintPress}>
                <Text style={styles.hintText}>💡 Need a hint?</Text>
            </TouchableOpacity>

            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
                <Picker.Item label="Select an answer..." value="" />
                {options.map((opt, index) => (
                    <Picker.Item key={index} label={opt} value={opt} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', marginBottom: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' },
    image: { width: '100%', height: 160 },
    questionRow: { flexDirection: 'row', padding: 12, alignItems: 'center' },
    questionText: { fontSize: 15, marginLeft: 6, fontWeight: '500', color: 'black' },
    hintText: { color: 'orange', paddingLeft: 12, paddingBottom: 8, fontStyle: 'italic', fontSize: 13 },
});

export default QuestionCard;
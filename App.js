import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ToastAndroid, StyleSheet } from 'react-native';
import QuestionCard from './components/QuestionCard';

const QUIZ_DATA = [
    { id: '1', question: 'Where is this landmark?', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', options: ['London', 'Paris', 'Rome'], correctAnswer: 'Paris', hint: 'City of Love' },
    { id: '2', question: 'Where is this landmark?', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600', options: ['London', 'New York', 'Sydney'], correctAnswer: 'London', hint: 'River Thames' },
    { id: '3', question: 'Where is this landmark?', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600', options: ['Athens', 'Rome', 'Madrid'], correctAnswer: 'Rome', hint: 'Ancient amphitheater' },
];

const MyApp = () => {
    const [answers, setAnswers] = useState(['', '', '']);

    // Handle answer selection
    const handleSelect = (val, index) => {
        const updated = answers.map((ans, i) => {
            if (i === index) {
                return val;
            }
            return ans;
        });
        setAnswers(updated);
    };

    // Handle submit and score evaluation
    const handleSubmit = () => {
        if (answers.includes('')) {
            ToastAndroid.show('Please answer all questions!', ToastAndroid.SHORT);
            return;
        }

        const score = QUIZ_DATA.filter((item, i) => answers[i] === item.correctAnswer).length;
        ToastAndroid.show('Submitted!', ToastAndroid.SHORT);
        Alert.alert('Quiz Result', `You got ${score}/${QUIZ_DATA.length} correct!`);
    };

    // Handle resetting the quiz
    const handleReset = () => {
        setAnswers(['', '', '']);
        ToastAndroid.show('Quiz reset!', ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <Text style={styles.title}>🌍 LANDMARK QUIZ</Text>

                {QUIZ_DATA.map((item, index) => (
                    <QuestionCard
                        key={item.id}
                        image={item.image} question={item.question} options={item.options}
                        selectedValue={answers[index]}
                        onValueChange={(val) => handleSelect(val, index)}
                        onHintPress={() => ToastAndroid.show(item.hint, ToastAndroid.SHORT)}
                    />
                ))}

                <TouchableOpacity style={[styles.btn, styles.submitBtn]} onPress={handleSubmit}>
                    <Text style={styles.btnText}>SUBMIT ANSWERS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={handleReset}>
                    <Text style={styles.resetText}>RESET QUIZ</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EBEBEB' },
    scroll: { padding: 16, paddingTop: 40, paddingBottom: 40 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: 'black' },
    btn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
    submitBtn: { backgroundColor: 'grey' },
    resetBtn: { backgroundColor: '#f9f9f8', borderWidth: 1, borderColor: 'red' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    resetText: { color: 'red', fontWeight: 'bold', fontSize: 16 },
});

export default MyApp;
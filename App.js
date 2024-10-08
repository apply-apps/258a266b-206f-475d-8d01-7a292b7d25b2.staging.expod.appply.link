// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [heroName, setHeroName] = useState('');
  const [tale, setTale] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateTale = async () => {
    if (!heroName.trim()) {
      alert('Please enter a hero name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a creative storyteller. Create a short tale based on the given hero name." },
          { role: "user", content: `Create a short tale about a hero named ${heroName}` }
        ],
        model: "gpt-4o"
      });
      const { data } = response;
      setTale(data.response);
    } catch (error) {
      console.error('Error generating tale:', error);
      alert('Failed to generate tale. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAIRY TALES</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hero name"
        value={heroName}
        onChangeText={setHeroName}
      />
      <TouchableOpacity style={styles.button} onPress={generateTale} disabled={isLoading}>
        <Text style={styles.buttonText}>Generate Tale</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.taleContainer}>
          <Text style={styles.taleText}>{tale}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a4a4a',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taleContainer: {
    width: '100%',
    maxHeight: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  taleText: {
    fontSize: 16,
  },
});

export default App;
// End of App.js
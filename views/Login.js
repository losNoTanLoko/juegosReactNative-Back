import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de usuario');
      return;
    }
    try {
      await AsyncStorage.setItem('username', username.trim());
      navigation.replace('Laberinto'); // ir al laberinto
    } catch (err) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor:'#222' },
  title:{ fontSize:24, marginBottom:20, color:'#fff' },
  input:{ width:'80%', padding:10, borderWidth:1, borderRadius:5, borderColor:'#ccc', backgroundColor:'#fff', marginBottom:20 },
  btn:{ backgroundColor:'#0a84ff', padding:15, borderRadius:5 },
  btnText:{ color:'#fff', fontWeight:'bold' },
});

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './views/Login';
import Laberinto from './views/Laberinto';
import Lista from './views/Lista';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Laberinto" component={Laberinto} options={{headerShown:false}}/>
        <Stack.Screen name="Lista" component={Lista} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

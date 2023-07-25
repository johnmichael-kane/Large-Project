import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabOneScreen from './screens/login';
import TabTwoScreen from './screens/register';
import BigList from './screens/biglist';
import SettingsPage from './screens/settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={TabOneScreen} />
        <Stack.Screen name="Register" component={(TabTwoScreen)} />
        <Stack.Screen name="BigList" component={BigList} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

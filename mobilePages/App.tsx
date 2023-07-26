import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabOneScreen from "./screens/login";
import TabTwoScreen from "./screens/register";
import BigList from "./screens/biglist";
import SettingsPage from "./screens/settings";
import MealPlanPage from "./screens/mealplanpage";
import RequestPasswordReset from "./screens/requestresetpassword"

import { LogBox } from "react-native";
// import RequestPasswordReset from "./screens/requestpasswordreset";
//this turns off all warnings, only turn this on if necessary
LogBox.ignoreAllLogs(true);
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
        <Stack.Screen name="Register" component={TabTwoScreen} />
        <Stack.Screen name="Big List" component={BigList} />
        <Stack.Screen name="Meal Plan" component={MealPlanPage} />
        <Stack.Screen name="RequestPasswordReset" component={RequestPasswordReset} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
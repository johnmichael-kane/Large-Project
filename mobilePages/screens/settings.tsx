import {
    Button,
    Dimensions,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from "../components/Themed";
import React from "react";
import { User } from "../API/APIModels";
  
export default function SettingsPage() {
    const [CalorieGoal, onCalorieGoalChange] = React.useState("");
    const [Password, onPasswordChange] = React.useState("");
    const [ConfirmPassword, onConfirmPasswordChange] = React.useState("");
    const navigation = useNavigation();

    const UpdateSettings = () => {
      /* if (user.CalorieGoal != parseInt(CalorieGoal)) {
        //Update the user's calorie goal and update the database with the new calorie goal
        user.CalorieGoal = parseInt(CalorieGoal);
        //write api call here
      }
      if (user.Password != Password && ConfirmPassword != Password) {
        alert("New passwords do not match.");
      } else if (user.Password != Password && ConfirmPassword === Password) {
        //Password reset stuff goes here, this might have to go to another page
      }*/
    };

    const handleLogout = () => {
        // Log out user
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.caloriealignment}>
                <Text style={styles.calorielabel}>Calorie Goal:</Text>
                <TextInput
                    style={styles.calorieinput}
                    placeholder={CalorieGoal.toString()}
                    autoComplete="username"
                    onChangeText={onCalorieGoalChange}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Save Settings"
                    onPress={UpdateSettings}
                    color={"green"}
                />
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      position: "absolute",
      left: 0,
      top: 0,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      position: "absolute",
      top: 70,
      color: "red",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    usernameview: {
      position: "absolute",
      alignContent: "center",
      top: 200,
    },
    calorielabel: {
        backgroundColor: "grey",
        padding: 10,
        fontSize: 16,
        color: "white",
    },
    caloriealignment: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    calorieinput: {
        backgroundColor: "grey",
        flex: 1,
        marginLeft: 10,
        padding: 10,
        color: "white",
    },
    passwordlabel: {
      color: "white",
      backgroundColor: "grey",
    },
    passwordalignment: {
      alignContent: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
      top: 230,
    },
    passwordinput: {
      color: "black",
      backgroundColor: "grey",
    },
    confirmpasswordview: {
      position: "absolute",
      top: 260,
    },
    confirmpasswordinput: {
      color: "black",
      backgroundColor: "grey",
    },
    buttonContainer: {
        marginVertical: 20,
      },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'red', 
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      logoutButtonText: {
        color: 'white', 
        fontSize: 16,
      },
  });
  
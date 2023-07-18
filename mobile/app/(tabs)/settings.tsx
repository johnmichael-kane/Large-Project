import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "../../components/Themed";
import React from "react";
import { User } from "../../API/APIModels";

export default function SettingsPage(user: User) {
  const [CalorieGoal, onCalorieGoalChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  const [ConfirmPassword, onConfirmPasswordChange] = React.useState("");
  const UpdateSettings = () => {
    if (user.CalorieGoal != parseInt(CalorieGoal)) {
      //Update the user's calorie goal and update the database with the new calorie goal
      user.CalorieGoal = parseInt(CalorieGoal);
      //write api call here
    }
    if (user.Password != Password && ConfirmPassword != Password) {
      alert("New passwords do not match.");
    } else if (user.Password != Password && ConfirmPassword === Password) {
      //Password reset stuff goes here, this might have to go to another page
    }
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.caloriealignment}>
        <Text style={styles.calorielabel}>Calorie Goal:</Text>
        <TextInput
          style={styles.calorieinput}
          placeholder={user.CalorieGoal.toString()}
          autoComplete="username"
          onChangeText={onCalorieGoalChange}
        ></TextInput>
      </View>
      <View style={styles.passwordalignment}>
        <Text style={styles.passwordlabel}>Password:</Text>
        <TextInput
          style={styles.passwordinput}
          placeholder="Password"
          autoComplete="password"
          onChangeText={onPasswordChange}
        ></TextInput>
      </View>
      <View style={styles.confirmpasswordview}>
        <Text>Confirm Password:</Text>
        <TextInput
          style={styles.confirmpasswordinput}
          placeholder="Confirm Password"
          autoComplete="password"
          onChangeText={onConfirmPasswordChange}
        ></TextInput>
      </View>
      <View style={{ alignContent: "center", position: "absolute", top: 290 }}>
        <Button
          title="Save Settings"
          onPress={UpdateSettings}
          color={"green"}
        />
      </View>
    </View>
  );
}

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
    color: "white",
    backgroundColor: "grey",
  },
  caloriealignment: {
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    top: 200,
  },
  calorieinput: {
    color: "white",
    backgroundColor: "grey",
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
});

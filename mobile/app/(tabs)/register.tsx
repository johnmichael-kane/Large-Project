import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "../../components/Themed";
import React from "react";

export default function TabTwoScreen() {
  const [UserName, onUserNameChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  const [ConfirmPassword, onConfirmPasswordChange] = React.useState("");
  const Login = () => {
    //check if username and password match a valid user in the database, and if so transition to the login screen
    alert(
      "Button Pressed, Username: " +
        UserName +
        " Password: " +
        Password +
        " Confirm Password: " +
        ConfirmPassword
    );
  };
  return (
    <ImageBackground
      blurRadius={2}
      source={require("C:/Users/Draco/NutritionApp/assets/images/startscreenbackground.jpg")}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Welcome! Please log in or register.</Text>
      <View style={styles.usernameview}>
        <Text>UserName:</Text>
        <TextInput
          style={styles.usernameinput}
          placeholder="Username"
          autoComplete="username"
          onChangeText={onUserNameChange}
        ></TextInput>
      </View>
      <View style={styles.passwordview}>
        <Text>Password:</Text>
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
      <View style={{ alignContent: "center", position: "absolute", top: 260 }}>
        <Button title="Login" onPress={Login} color={"green"} />
      </View>
    </ImageBackground>
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
  usernameinput: {
    color: "black",
    backgroundColor: "grey",
  },
  passwordview: {
    position: "absolute",
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

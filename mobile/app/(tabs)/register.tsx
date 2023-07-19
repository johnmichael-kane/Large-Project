import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";

import { Text, View } from "../../components/Themed";
import React from "react";
import { Food, MealPlan } from "../../API/APIModels";

export default function TabTwoScreen() {
  const [UserName, onUserNameChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  const [ConfirmPassword, onConfirmPasswordChange] = React.useState("");
  let BigList: Food[];
  let MealPlan: Food[];
  const Register = () => {
    //check if username and password match a valid user in the database, and if so transition to the login screen
  };
  return (
    <ImageBackground
      blurRadius={2}
      source={require("C:/Users/Draco/NutritionApp/assets/images/startscreenbackground.jpg")}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Register</Text>
      <View style={styles.usernamealignment}>
        <Text style={styles.usernamelabel}>UserName:</Text>
        <TextInput
          style={styles.usernameinput}
          placeholder="Username"
          autoComplete="username"
          onChangeText={onUserNameChange}
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
        <Button title="Login" onPress={Register} color={"green"} />
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
  usernamelabel: {
    color: "white",
    backgroundColor: "grey",
  },
  usernamealignment: {
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    top: 200,
  },
  usernameinput: {
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

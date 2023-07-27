import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "../components/Themed";
import React from "react";
import { Food, MealPlan } from "../API/APIModels";
import { useNavigation } from "@react-navigation/native";
import {
  Register,
  RegisterResponse,
  EmailVerificationRequest,
  EmailVerificationRequestResponse,
} from "../API/api";

export default function TabTwoScreen() {
  const [Email, onEmailChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  const [ConfirmPassword, onConfirmPasswordChange] = React.useState("");
  const navigation = useNavigation();
  let BigList: Food[];
  let MealPlan: Food[];

  const registerUser = () => {
    if (Password !== ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    Register(Email, Password)
      .then((registerResponse: RegisterResponse) => {
        console.log("Register Response: ", registerResponse);
        verifyEmail();
      })
      .catch((error: any) => {
        console.error("Registration Error: ", error);
      });
  };
  const verifyEmail = () => {
    EmailVerificationRequest(Email)
      .then((verificationResponse: EmailVerificationRequestResponse) => {
        navigation.navigate("Login");
      })
      .catch((error: any) => {
        console.error("Email Verification Error: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email:"
          onChangeText={onEmailChange}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={onPasswordChange}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={onConfirmPasswordChange}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  inputContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 20,
  },
  label: {
    flex: 1,
    color: "#000",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 2,
    color: "black",
    backgroundColor: "#e8e8e8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 0.4,
    flexDirection: "column",
    width: "80%",
    justifyContent: "space-evenly",
  },
  registerButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontsize: 16,
  },
});

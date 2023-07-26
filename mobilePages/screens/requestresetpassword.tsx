import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import axios, { AxiosResponse } from "axios";
import { Text, View } from "../components/Themed";
import { User, Food, MealPlan } from "../API/APIModels";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getBigList,
  GetUserMealPlan,
  login,
  LoginResponse,
  PasswordResetRequest,
  PasswordResetRequestResponse,
} from "../API/api";

export default function RequestPasswordReset() {
  const navigation = useNavigation();
  const route = useRoute();
  const [EmailAddress, setEmail] = React.useState("");
  var BigList: Food[] = [];
  let userMealPlan: MealPlan;
  var user = new User("", "", 0);

  const handleReset = () => {
    PasswordResetRequest(EmailAddress)
      .then((resetrequestResponse: PasswordResetRequestResponse) => {
        // Navigate to biglist screen, passing user information
        // navigation.navigate('BigList', response);
        console.log("Login Response: ", resetrequestResponse);
        let code = resetrequestResponse.code;
        navigation.navigate("EnterResetPassword", { code });
      })
      .catch((error: any) => {
        console.error("Login Error: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter email to send password request:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight>
          <Button title="Login" onPress={handleReset} color="black" />
        </TouchableHighlight>
        <TouchableHighlight>
          <Button title="Reset Password" color="black" />
        </TouchableHighlight>
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    marginBottom: 30,
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
    flex: 0.6,
    flexDirection: "column",
    width: "80%",
    justifyContent: "space-evenly",
  },
});

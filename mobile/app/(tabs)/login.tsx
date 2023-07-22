import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

import axios, { AxiosResponse } from 'axios';
import { Text, View } from "../../components/Themed";
import { User, Food } from "../../API/APIModels";
import React from "react";
import { useNavigation } from "expo-router";
import {login , LoginResponse} from "../../API/api"

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [EmailAddress, onEmailAddressChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  let BigList: Food[];
  let MealPlan: Food[];
  const Login  = async () => {
      // Make the login API call
      const loginResult = await login(EmailAddress, Password)
      console.log("this is result " + loginResult.Email + " " + loginResult.error)
    if(!(loginResult.error === "loginFailure")
    {
        GetBigList();
        GetMealPlan();
    }
  };
  const GetBigList = () => {
    //Get the entire list of meals through an API call, parse the information and store it into an array of class food
  };
  const GetMealPlan = () => {
    //Get the user's meal plan through an API Call, parse the information and store it in the equivalent arrays
  };
  function ResetPassword() {
    if (EmailAddress == null || EmailAddress === "") {
      alert("Enter an email address to send the password request to.");
    }
    //Password reset stuff goes here, this might have to go to another page
  }
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.emailalignment}>
        <Text style={styles.emaillabel}>Email: </Text>
        <TextInput
          style={styles.emailinput}
          placeholder="Email"
          onChangeText={onEmailAddressChange}
        ></TextInput>
      </View>
      <View style={styles.passwordalignment}>
        <Text style={styles.passwordlabel}>Password: </Text>
        <TextInput
          style={styles.passwordinput}
          placeholder="Password"
          onChangeText={onPasswordChange}
        ></TextInput>
      </View>
      <View style={{ alignContent: "center", position: "absolute", top: 290 }}>
        <Button title="Login" onPress={ Login()} color={"green"} />
      </View>
      <View style={{ alignContent: "center", position: "absolute", top: 320 }}>
        <Button
          title="Reset Password"
          onPress={ResetPassword}
          color={"black"}
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
  background: {
    backgroundColor: "white",
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
  emaillabel: {
    color: "white",
    backgroundColor: "grey",
  },
  emailalignment: {
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    top: 200,
  },
  emailinput: {
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
});

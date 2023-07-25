import {
    Button,
    Dimensions,
    ImageBackground,
    StyleSheet,
    TextInput,
  } from "react-native";
  
  import { Text, View } from "../components/Themed";
  import React from "react";
  import { Food, MealPlan } from "../API/APIModels";
  
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>UserName:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoComplete="username"
            onChangeText={onUserNameChange}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoComplete="password"
            onChangeText={onPasswordChange}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            autoComplete="password"
            onChangeText={onConfirmPasswordChange}
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={Register} color="black" />
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
  });
  

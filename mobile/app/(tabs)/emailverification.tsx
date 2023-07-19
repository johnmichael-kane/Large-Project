import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { User, Food } from "../../API/APIModels";
import React from "react";
import { useNavigation } from "expo-router";

export default function EmailVerificationPage(user: User, emailnumber: number) {
  const navigation = useNavigation();
  const [userInput, onNumberChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  let BigList: Food[];
  let MealPlan: Food[];
  const Login = () => {
    let userinput = parseInt(userInput);
    //check if the number provided by user is correct
    if (userinput != emailnumber) {
      alert("Input does not match expected number");
      return;
    } else {
      //if successful
      GetBigList();
      GetMealPlan();
      //navigate to the biglist page
    }
  };
  const GetBigList = () => {
    //Get the entire list of meals through an API call, parse the information and store it into an array of class food
  };
  const GetMealPlan = () => {
    //Get the user's meal plan through an API Call, parse the information and store it in the equivalent arrays
  };
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Email Verification</Text>
      <View style={styles.emailalignment}>
        <Text style={styles.emaillabel}>Enter the number recieved:</Text>
        <TextInput
          style={styles.emailinput}
          placeholder="Email"
          onChangeText={onNumberChange}
        ></TextInput>
      </View>
      <View style={{ alignContent: "center", position: "absolute", top: 230 }}>
        <Button title="Login" onPress={Login} color={"green"} />
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

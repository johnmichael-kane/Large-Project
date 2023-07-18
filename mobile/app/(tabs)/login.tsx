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
import md5 from "../js/md5";

export default function TabOneScreen() {
  //This needs to be changed to what we use for the large project
  const urlBase = "http://smallproject.site/LAMPAPI";
  const extension = "php";

  const navigation = useNavigation();
  const [EmailAddress, onEmailAddressChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");

  const Login = () => {
    //use an API call to check if the user is logged in, and if so navigate to the biglist page otherwise use an alert to tell the user incorrect email or password entered
  };
  const GetBigList = () => {
    //Get the entire list of meals through an API call, parse the information and store it into an array of class food
  };
  const GetMealPlan = () => {
    //Get the user's meal plan through an API Call, parse the information and store it in the equivalent arrays
  };
  return (
    <ImageBackground
      blurRadius={2}
      source={require("C:/Users/Draco/NutritionApp/assets/images/startscreenbackground.jpg")}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Log In</Text>
      <View style={styles.usernamealignment}>
        <Text style={styles.usernamelabel}>Email: </Text>
        <TextInput
          style={styles.usernameinput}
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
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "flex-start",
    alignItems: "center",
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
});

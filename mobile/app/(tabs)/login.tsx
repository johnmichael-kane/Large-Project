import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { User, Food } from "../../API/UserModel";
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
    //check if username and password match a valid user in the database, and if so transition to the login screen
    var hash = md5(Password);
    let tmp = { Email: EmailAddress, Password: hash };
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + "/Login." + extension;
    let user: User;
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let jsonObject = JSON.parse(xhr.responseText);
          if (jsonObject.EmailAddress === null)
            alert("No user was found for that email and password.");

          user = new User(
            jsonObject.EmailAddress,
            jsonObject.Password,
            jsonObject.CalorieGoal
          );
          //transition to big list page, assuming this code works
        }
      };
    } catch (err) {
      alert("ERROR");
    }
  };
  const GetBigList = () => {
    //Get the entire list of meals
  };
  const GetMealPlan = () => {
    //Get the user's meal plan, parse the information and store it in the equivalent arrays
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

import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

import { Text, View } from "../../components/Themed";
import User from "../../API/UserModel";
import React from "react";
import { useNavigation } from "expo-router";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [UserName, onUserNameChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  const Login = () => {
    //check if username and password match a valid user in the database, and if so transition to the login screen
  };
  return (
    <ImageBackground
      blurRadius={2}
      source={require("C:/Users/Draco/NutritionApp/assets/images/startscreenbackground.jpg")}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Welcome! Please log in or register.</Text>
      <View>
        <TextInput
          style={styles.username}
          placeholder="Username"
          autoComplete="username"
          onChangeText={onUserNameChange}
        ></TextInput>
      </View>
      <View>
        <TextInput
          style={styles.password}
          placeholder="Password"
          autoComplete="password"
          onChangeText={onPasswordChange}
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
  username: {
    position: "absolute",
    top: 200,
    color: "black",
    backgroundColor: "grey",
  },
  password: {
    position: "absolute",
    top: 230,
    color: "black",
    backgroundColor: "grey",
  },
});

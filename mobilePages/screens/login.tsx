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
import { useNavigation } from "@react-navigation/native";
import {
  getBigList,
  GetUserMealPlan,
  login,
  LoginResponse,
  PasswordResetRequest,
} from "../API/api";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [EmailAddress, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  var BigList: Food[] = [];
  let userMealPlan: MealPlan;
  var user = new User("", "", 0);
  const handleLogin = () => {
    login(EmailAddress, Password)
      .then((loginResponse: LoginResponse) => {
        // Navigate to biglist screen, passing user information
        // navigation.navigate('BigList', response);
        console.log("Login Response: ", loginResponse);
        user.Email = loginResponse.Email;
        user.accessToken = loginResponse.accessToken;
        GetBigList(loginResponse.accessToken);
      })
      .catch((error: any) => {
        console.error("Login Error: ", error);
      });
  };

  const GetBigList = async (accessToken: string) => {
    //Get the entire list of meals through an API call, parse the information and store it into an array of class food
    const BigListResult = await getBigList(accessToken);
    BigList = [new Food("", 0, 0, 0, 0, "1")];
    //BigListResult.nameResults.length
    for (let i = 0; i < 200; i++) {
      BigList.push(
        new Food(
          BigListResult.nameResults[i],
          BigListResult.caloriesResults[i],
          BigListResult.proteinResults[i],
          BigListResult.fatResults[i],
          BigListResult.carbsResults[i],
          BigListResult.servingResults[i]
        )
      );
    }
    BigList.shift();
    GetMealPlan(EmailAddress, accessToken);
  };

  const GetMealPlan = async (email: string, accessToken: string) => {
    //Get the user's meal plan through an API Call, parse the information and store it in the equivalent arrays
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const MealPlanResult = await GetUserMealPlan(year, month, day, accessToken);
    if (MealPlanResult != null)
      userMealPlan = new MealPlan(
        MealPlanResult.nameResults,
        MealPlanResult.caloriesResults,
        MealPlanResult.proteinResults,
        MealPlanResult.fatResults,
        MealPlanResult.carbsResults,
        MealPlanResult.numServings,
        MealPlanResult.Fats,
        MealPlanResult.Protein,
        MealPlanResult.Carbs,
        MealPlanResult.Calories
      );
    for (let i = 0; i < MealPlanResult.nameResults.length; i++) {
      console.log(MealPlanResult.nameResults[i]);
    }
    navigateBigList();
  };

  function ResetPassword() {
    navigation.navigate("RequestResetPassword");
  }

  async function PasswordResetRequestLogin(email: string) {
    const PasswordResetRequestResult = await PasswordResetRequest(email);
  }

  const navigateBigList = () => {
    navigation.navigate("BigList", { user, BigList, userMealPlan });
  };

  const navigateRegister = (bigList: Food[]) => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight>
          <Button title="Login" onPress={handleLogin} color="black" />
        </TouchableHighlight>
        <TouchableHighlight>
          <Button title="Reset Password" color="black" />
        </TouchableHighlight>
        <TouchableHighlight>
          <Button
            title="Register Account"
            onPress={navigateRegister}
            color="black"
          />
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

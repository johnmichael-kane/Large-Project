import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
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
  var mealPlan: MealPlan;
  var user = new User("", "");
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
    for (let i = 0; i < BigListResult.nameResults.length; i++) {
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
      mealPlan = new MealPlan(
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
    if (EmailAddress == null || EmailAddress === "") {
      alert("Enter an email address to send the password request to.");
    }
    //Password reset stuff goes here, this might have to go to another page
  }

  async function PasswordResetRequestLogin(email: string) {
    const PasswordResetRequestResult = await PasswordResetRequest(email);
  }

  const navigateBigList = () => {
    navigation.navigate("BigList", { user, BigList });
  };

  const navigateRegister = (bigList: Food[]) => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
        <Button title="Login" onPress={handleLogin} color="green" />
        <Button
          title="Reset Password"
          // onPress = Reset Password
          color="black"
        />
        <Button
          title="Register Account"
          onPress={navigateRegister}
          color="green"
        />
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    color: "white",
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 2,
    color: "black",
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
  },
});

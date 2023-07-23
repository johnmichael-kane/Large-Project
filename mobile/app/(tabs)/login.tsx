import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

import axios, { AxiosResponse } from "axios";
import { Text, View } from "../../components/Themed";
import { User, Food, MealPlan } from "../../API/APIModels";
import React from "react";
import { useNavigation } from "expo-router";
import {
  getBigList,
  GetUserMealPlan,
  login,
  LoginResponse,
  PasswordResetRequest,
} from "../../API/api";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [EmailAddress, onEmailAddressChange] = React.useState("");
  const [Password, onPasswordChange] = React.useState("");
  var BigList: Food[] = [];
  var mealPlan: MealPlan;
  const Login = async () => {
    // Make the login API call
    const loginResult = await login(EmailAddress, Password);
    console.log(
      "this is result " + loginResult.Email + " " + loginResult.error
    );
    if (!(loginResult.error === "loginFailure")) {
      GetBigList(loginResult.accessToken);
    }
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
    const date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    const MealPlanResult = await GetUserMealPlan(year, month, day, accessToken);
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
    for(let i = 0; i < MealPlanResult.nameResults.length; i++)
    {
      console.log(MealPlanResult.nameResults[i]);
    }

  };
  function ResetPassword() {
    if (EmailAddress == null || EmailAddress === "") {
      alert("Enter an email address to send the password request to.");
    }
    //Password reset stuff goes here, this might have to go to another page

  }
  async function PasswordResetRequestLogin(email: string){
    const PasswordResetRequestResult = await PasswordResetRequest(email);
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
        <Button title="Login" onPress={() => Login()} color={"green"} />
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

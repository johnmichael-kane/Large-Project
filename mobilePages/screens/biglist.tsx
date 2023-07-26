import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as React from "react";
import { Text, View } from "../components/Themed";
import { User, Food, MealPlan } from "../API/APIModels";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { SearchBar } from "react-native-screens";
import { AddUserFood, GetUserMealPlan } from "../API/api";

export default function BigList() {
  const navigation = useNavigation();
  const route = useRoute();
  const response = route.params;
  const [selectedId, setSelectedId] = useState<string>();
  let userMealPlan: MealPlan;

  const UpdateMealPlan = (event: Food) => {
    let food: Food;
    food = new Food("", 0, 0, 0, 0, "");
    let emptyFood = food;
    food = event;
    for (let i = 0; i < response.BigList.length; i++) {
      if (food.FoodName === response.BigList[i].FoodName) {
        insertToMealPlan(food);
        return;
      }
    }
  };
  const insertToMealPlan = async (food: Food) => {
    let insertresponse = await AddUserFood(
      food.FoodName,
      food.Calories,
      food.Fats,
      food.Carbs,
      food.Protein,
      food.ServingSize,
      1,
      response.user.accessToken
    );
    if (insertresponse.error === "added") {
      alert(
        "Successfully added " +
          food.FoodName +
          " to " +
          response.user.email +
          "'s meal plan."
      );
    } else {
      alert("Error: " + insertresponse.error);
    }
  };
  type ItemProps = {
    item: Food;
    onPress: (food: Food) => void;
    backgroundColor: string;
    textColor: string;
  };
  const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor }]}
      onPress={() => UpdateMealPlan(item)}
    >
      <Text style={[styles.data, { color: textColor }]}>
        {item.FoodName}, Calories: {item.Calories}
      </Text>
    </TouchableOpacity>
  );
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
      />
    );
  };
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  const renderItem = ({ item }: { item: Food }) => {
    const backgroundColor = item.FoodName === selectedId ? "black" : "white";
    const color = item.FoodName === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => UpdateMealPlan(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const navigateSettings = () => {
    let user = response.user;
    let BigList = response.BigList;
    userMealPlan = response.userMealPlan;
    navigation.navigate("Settings", { user, BigList, userMealPlan });
  };
  const updateUserMealPlan = async () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let accessToken = response.user.accessToken;
    const MealPlanResult = await GetUserMealPlan(year, month, day, accessToken);
    if (MealPlanResult != null)
      response.userMealPlan = new MealPlan(
        MealPlanResult.nameResults,
        MealPlanResult.caloriesResults,
        MealPlanResult.proteinResults,
        MealPlanResult.fatResults,
        MealPlanResult.carbsResults,
        MealPlanResult.numServings,
        MealPlanResult.Calories,
        MealPlanResult.Fats,
        MealPlanResult.Protein,
        MealPlanResult.Carbs
      );
  };
  const navigateMealPlan = () => {
    let completedMealPlan: Food[] = [];
    updateUserMealPlan();
    let foodNameResults = response.userMealPlan.nameResults;
    let foodnumber = foodNameResults.length;
    for (let i = 0; i < foodnumber; i++) {
      completedMealPlan.push(
        new Food(
          response.userMealPlan.nameResults[i],
          response.userMealPlan.calorieResults[i],
          response.userMealPlan.proteinResults[i],
          response.userMealPlan.fatResults[i],
          response.userMealPlan.carbsResults[i],
          response.userMealPlan.numServings[i]
        )
      );
    }
    let user = response.user;
    let BigList = response.BigList;
    userMealPlan = response.userMealPlan;
    navigation.navigate("Meal Plan", {
      user,
      BigList,
      userMealPlan,
      completedMealPlan,
    });
  };

  // Removes back arrow
  useEffect(() => {
    const hideBackButton = () => {
      navigation.setOptions({
        headerLeft: () => null,
      });
    };

    hideBackButton();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={response.BigList}
        maxToRenderPerBatch={30}
        initialNumToRender={30}
        style={{ height: 250 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.FoodName}
        extraData={selectedId}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>All Foods</Text>
          </View>
        )}
      />
      
      <TouchableOpacity
        style={styles.mealplanbutton}
        onPress={navigateMealPlan}>
        <Text style={styles.buttonText}>Meal Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  data: {
    fontSize: 16,
  },
  
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  mealplanbutton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  
});
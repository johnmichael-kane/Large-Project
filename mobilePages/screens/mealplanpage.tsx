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
import { GetUserMealPlan, RemoveUserFood } from "../API/api";

export default function MealPlanPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const response = route.params;
  const [selectedId, setSelectedId] = useState<string>();
  let completedMealPlan: Food[] = [];
  let removedJWT = "";
  let calorieTotal = 0;

  const UpdateMealPlan = (event: any) => {
    let food: Food;
    food = event;
    for (let i = 0; i < response.completedMealPlan.length; i++) {
      if (food.FoodName === response.completedMealPlan[i].FoodName) {
        response.completedMealPlan.splice(i, 1);
        removeFromPlan(food);
      }
    }
  };
  const removeFromPlan = async (food: Food) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let removedresult = await RemoveUserFood(
      food.FoodName,
      response.user.accessToken,
      year,
      day,
      month
    );
    removedJWT = removedresult.jwtToken.accessToken;
    navigateMealPlan();
  };
  const updateUserMealPlan = async () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let accessToken = response.user.accessToken;
    let MealPlanResult = await GetUserMealPlan(year, month, day, accessToken);
    if (removedJWT != "") {
      MealPlanResult = await GetUserMealPlan(year, month, day, removedJWT);
    }
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
    completedMealPlan = [];
    updateUserMealPlan();
    let foodNameResults = response.userMealPlan.nameResults;
    let foodnumber = foodNameResults.length;
    for (let i = 0; i < foodnumber; i++) {
      calorieTotal += response.userMealPlan.calorieResults[i];
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
    let userMealPlan = response.userMealPlan;
    let Password = response.Password;
    navigation.navigate("MealPlanPage", {
      user,
      BigList,
      userMealPlan,
      completedMealPlan,
      calorieTotal,
    });
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
    let userMealPlan = response.userMealPlan;
    navigation.navigate("Settings", { user, BigList, userMealPlan });
  };
  const navigateBigList = () => {
    let user = response.user;
    let BigList = response.BigList;
    let userMealPlan = response.userMealPlan;
    navigation.navigate("BigList", { user, BigList, userMealPlan });
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
        data={response.completedMealPlan}
        maxToRenderPerBatch={30}
        initialNumToRender={30}
        style={{ height: 210 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.FoodName}
        extraData={selectedId}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.text}>Calorie total: {response.calorieTotal}</Text>
        <Text style={styles.text}>Fat total: {response.userMealPlan.Fats}</Text>
        <Text style={styles.text}>
          Protein total: {response.userMealPlan.Protein}
        </Text>
        <Text style={styles.text}>
          Carbs total: {response.userMealPlan.Carbs}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.allFoodsButton}
          onPress={navigateBigList}
        >
          <Text style={styles.settingsButtonText}>All Foods</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={navigateSettings}
        >
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonContainer: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    flex: 1,
    color: "#000",
    backgroundColor: "#fff",
    textAlign: "left",
    paddingLeft: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  calorietotaltext: {
    fontSize: 20,
  },
  data: {
    fontSize: 16,
  },
  biglistbutton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  allFoodsButton: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  settingsButtonText: {
    color: "white",
    fontSize: 16,
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
  addButton: {
    flex: 1,
  },
  addButtonText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});

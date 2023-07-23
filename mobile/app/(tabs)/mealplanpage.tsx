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
import { Text, View } from "../../components/Themed";
import { User, Food } from "../../API/APIModels";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function MealPlan(foods: Food[], user: User) {
  type ItemProps = {
    item: Food;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };

  const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    <TouchableOpacity
      //change this to remove the food item to the user's meal plan through an API call
      onPress={() => UpdateMealPlan(item)}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.data, { color: textColor }]}>
        {item.FoodName}, Calories: {item.Calories}
      </Text>
    </TouchableOpacity>
  );
  let [totalCalories, updateTotalCalories] = React.useState(Number);
  let [totalCarbs, updateTotalCarbs] = React.useState(Number);
  let [totalFats, updateTotalFats] = React.useState(Number);
  let totalProtein = 0;
  const calculateTotalValues = () => {
    totalCalories = 0;
    totalCarbs = 0;
    totalFats = 0;
    totalProtein = 0;
    for (let i = 0; i < foods.length; i++) {
      totalCalories += foods[i].Calories;
      totalCarbs += foods[i].Carbs;
      totalFats += foods[i].Fats;
      totalProtein += foods[i].Protein;
    }
  };

  const UpdateMealPlan = (event: any) => {
    let food: Food;
    food = new Food("", 0, 0, 0, 0, 0, "");
    if (event.type == Food) food = event;
    for (let i = 0; i < foods.length; i++) {
      if (food === foods[i]) foods.splice(i, 1);
    }
    //call api to remove selected food from user's list in the database
    calculateTotalValues();
  };
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
  const [selectedId, setSelectedId] = useState<string>("");
  let caloriecolor = totalCalories > user.CalorieGoal ? "red" : "black";
  const caloriegoaltextcolor = StyleSheet.create({
    text: {
      color: caloriecolor,
    },
  });
  const renderItem = ({ item }: { item: Food }) => {
    const backgroundColor = item.FoodName === selectedId ? "black" : "white";
    const color = item.FoodName === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.FoodName)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.FoodName}
        extraData={selectedId}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              marginTop: 20,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Meal Plan
          </Text>
        )}
      />
      <View>
        <Text onLayout={calculateTotalValues}>
          Calorie total: {totalCalories}
        </Text>
        <Text style={caloriegoaltextcolor.text}>
          Calorie Goal: {user.CalorieGoal}
        </Text>
        <Text onLayout={calculateTotalValues}>
          Protein total: {totalProtein}
        </Text>
        <Text onLayout={calculateTotalValues}>Carbs total: {totalCarbs}</Text>
        <Text onLayout={calculateTotalValues}>Fat total: {totalFats}</Text>
      </View>
    </SafeAreaView>
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
});

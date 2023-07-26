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
    if (removedresult.error === "deleted") alert("removed food");
    else alert("Error: " + removedresult.error);
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
        renderItem={renderItem}
        keyExtractor={(item) => item.FoodName}
        extraData={selectedId}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {response.user.Email}'s Meal Plan
            </Text>
          </View>
        )}
      />
      <View>
        <Text>Calorie total: {response.userMealPlan.Calories}</Text>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={navigateBigList}>
        <Text style={styles.settingsButtonText}>All Foods</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={navigateSettings}
      >
        <Text style={styles.settingsButtonText}>Settings</Text>
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
  settingsButton: {
    position: "absolute",
    bottom: 20,
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

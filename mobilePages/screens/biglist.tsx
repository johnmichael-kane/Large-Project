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
import { User, Food } from "../API/APIModels";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SearchBar } from "react-native-screens";
  
let foods = [
    new Food("test1", 1, 1, 1, 1, 1, "null"),
    new Food("test2", 2, 2, 2, 2, 2, "test"),
    new Food("test3", 3, 3, 3, 3, 3, "null"),
    new Food("test4", 4, 4, 4, 4, 4, "test"),
  ];

let mealPlan = [new Food("test5", 5, 5, 5, 5, 5, "test")];

export default function BigList() {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState<string>();
    const UpdateMealPlan = (event: any) => {
      let food: Food;
      food = new Food("", 0, 0, 0, 0, 0, "");
      let emptyFood = food;
      food = event;
      for (let i = 0; i < foods.length; i++) {
        if (food.FoodName === foods[i].FoodName) food = foods[i];
      }
      if (food == emptyFood) {
        alert("error: unable to find the selected food");
      } else {
        mealPlan.push(food);
        alert("Successfully added selected food " + food.FoodName);
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
              All Food Items
            </Text>
            // <SearchBar placeholder="Enter food name here"></SearchBar>
          )}
        />
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
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
    settingsButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'green',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      settingsButtonText: {
        color: 'white',
        fontSize: 16,
      },
  });
  
import {
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import * as React from "react";
import { Text, View } from "../../components/Themed";
import { User, Food } from "../../API/APIModels";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BigListPage(user: User, foods: Food[]) {
  const navigation = useNavigation();
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foods}
        renderItem={({ item }) => <Text>{item.FoodName}</Text>}
        keyExtractor={(item) => item.FoodName}
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
            List of Foods
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

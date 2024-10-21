import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CartIconWithBadge from "./CustomCartIcon";
import CheckoutScreen from "./CheckoutScreen";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Search") iconName = "search";

            if (route.name === "Checkout")
              return <CartIconWithBadge color={color} />;

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Checkout" component={CheckoutScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

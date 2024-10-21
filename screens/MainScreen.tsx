import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import CheckoutScreen from "./CheckoutScreen";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import { RootState } from "../redux/store";

const Tab = createBottomTabNavigator();

const CartIconWithBadge = ({ color }: { color: string }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View>
      <Icon name="shopping-cart" size={24} color={color} />
      {totalQuantity > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{totalQuantity}</Text>
        </View>
      )}
    </View>
  );
};

const MainScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            }

            if (route.name === "Checkout") {
              return <CartIconWithBadge color={color} />;
            }

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
  badgeContainer: {
    position: "absolute",
    left: 20,
    top: -4,
    backgroundColor: "red",
    borderRadius: 18 / 2,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import StarShipList from "../components/ShipsList/StarShipList";
import CartBanner from "../components/common/CartBanner";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StarShipList />
      <CartBanner />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

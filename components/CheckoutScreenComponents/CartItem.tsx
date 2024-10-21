import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayPrice from "../common/DisplayPrice";
import AddToCart from "../common/AddToCart";

const CartItem = ({ item }: { item: CartItem }) => {
  const { name, price, starship_class } = item;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.manufacturer}>{starship_class}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={{ gap: 8 }}>
        <DisplayPrice price={price} fontSize={14} />
        <AddToCart starship={item} />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    gap: 12,
    width: 130,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  manufacturer: {
    fontSize: 12,
    fontWeight: "300",
  },
});

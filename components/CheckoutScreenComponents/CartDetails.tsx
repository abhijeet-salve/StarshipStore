import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import CartItem from "./CartItem";

const CartDetails = ({
  cartItems,
  totalQuantity,
}: {
  cartItems: CartItem[];
  totalQuantity: number;
}) => {
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItem item={item} />
  );

  return (
    <View>
      <Text style={styles.header}>
        Your Order
        <Text style={styles.subHeader}> ({totalQuantity} items)</Text>
      </Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.name}
        renderItem={renderCartItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
export default CartDetails;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "normal",
    color: "gray",
  },
  listContainer: {
    paddingVertical: 20,
  },
  card: {
    justifyContent: "space-between",
    gap: 8,
    width: 120,
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
});

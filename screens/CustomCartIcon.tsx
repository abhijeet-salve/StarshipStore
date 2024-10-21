import React from "react";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../redux/selectors/cartSelectors";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const CartIconWithBadge = ({ color }: { color: string }) => {
  const totalQuantity = useSelector(selectTotalQuantity);

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

export default CartIconWithBadge;

const styles = StyleSheet.create({
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

import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { formatPrice } from "../../utils/priceUtil";

const DisplayPrice = ({
  price,
  fontSize,
}: {
  price: number;
  fontSize: number;
}) => {
  const formatterPrice = formatPrice(price);
  return (
    <Text style={{ fontSize: fontSize }}>
      AED <Text style={styles.bold}>{formatterPrice}</Text>
    </Text>
  );
};

export default DisplayPrice;

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});

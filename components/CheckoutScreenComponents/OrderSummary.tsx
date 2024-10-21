import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getVatAmount } from "../../utils/priceUtil";
import DisplayPrice from "../common/DisplayPrice";

const OrderSummary = ({
  totalPrice,
  totalQuantity,
}: {
  totalPrice: number;
  totalQuantity: number;
}) => {
  return (
    <View>
      <Text style={styles.header}>Order Summary</Text>

      <View style={{ marginTop: 12, gap: 8 }}>
        <View style={styles.priceSplitItem}>
          <Text>Subtotal ({totalQuantity} items)</Text>

          <DisplayPrice price={totalPrice} fontSize={14} />
        </View>

        <View style={styles.priceSplitItem}>
          <Text>VAT (5%)</Text>

          <DisplayPrice price={getVatAmount(totalPrice)} fontSize={14} />
        </View>

        <View style={styles.priceSplitItem}>
          <Text>Total</Text>

          <DisplayPrice
            price={totalPrice + getVatAmount(totalPrice)}
            fontSize={14}
          />
        </View>
      </View>
    </View>
  );
};
export default OrderSummary;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceSplitItem: { flexDirection: "row", justifyContent: "space-between" },
});

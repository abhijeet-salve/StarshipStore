import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome6";

export enum EPaymentOptions {
  CASH = "Cash",
  CARD = "Card",
}

const PaymentOptions = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: {
  selectedPaymentMethod: EPaymentOptions;
  setSelectedPaymentMethod: (option: EPaymentOptions) => void;
}) => {
  return (
    <View>
      <Text style={styles.header}>Payment</Text>

      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === "Cash" && styles.selectedPayment,
        ]}
        onPress={() => setSelectedPaymentMethod(EPaymentOptions.CASH)}
      >
        <Text style={styles.option}>Cash on Delivery</Text>
        <MIcon name="cash" size={24} color="green" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentButton,
          selectedPaymentMethod === "Card" && styles.selectedPayment,
        ]}
        onPress={() => setSelectedPaymentMethod(EPaymentOptions.CARD)}
      >
        <Text style={styles.option}>Card</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <FIcon name="cc-visa" size={20} color="#1A1F71" />
          <FIcon name="cc-amex" size={20} color="#016FD0" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentOptions;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 12,
    borderRadius: 5,
  },
  selectedPayment: {
    borderColor: "black",
    borderWidth: 1,
  },
  option: {
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});

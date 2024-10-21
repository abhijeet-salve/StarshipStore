import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FullScreenMessage = ({ message }: { message: string }) => {
  return (
    <View style={[styles.container, styles.message]}>
      <Text style={styles.largeText}>{message} </Text>
    </View>
  );
};

export default FullScreenMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: { justifyContent: "center", alignItems: "center", gap: 20 },
  largeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    letterSpacing: 0.2,
  },
});

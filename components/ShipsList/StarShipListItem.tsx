import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { convertCreditsToAED } from "../../utils/priceUtil";
import DisplayPrice from "../common/DisplayPrice";
import AddToCart from "../common/AddToCart";

const StarShipListItem = ({ ship }: { ship: Starship }) => {
  const convertedPrice = convertCreditsToAED(ship.cost_in_credits);
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: "https://picsum.photos/200/200" }}
        style={styles.image}
      />
      <AddToCart starship={ship} />
      <DisplayPrice price={convertedPrice} fontSize={14} />
      <Text>{ship.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    margin: 6,
    gap: 6,
    borderRadius: 12,
  },
  image: {
    width: "auto",
    height: 100,
    borderRadius: 8,
  },
});

export default StarShipListItem;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { removeFromCart, setCartItem } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { MAX_QUANTITY_PER_ITEM } from "../../utils/constants";

interface IAddToCartProps {
  starship: Starship;
}

const AddToCart = ({ starship }: IAddToCartProps) => {
  const dispatch = useDispatch();
  const priceInAED = Number(starship.cost_in_credits) / 10000;

  const quantity = useSelector(
    (state: RootState) =>
      state.cart.items.find((ship) => ship.name === starship.name)?.quantity ||
      0
  );

  const updateCart = (newQuantity: number) => {
    dispatch(
      newQuantity > 0
        ? setCartItem({
            ...starship,
            price: priceInAED,
            quantity: newQuantity,
          })
        : removeFromCart(starship.name)
    );
  };

  const modifyQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0 && newQuantity <= MAX_QUANTITY_PER_ITEM) {
      updateCart(newQuantity);
    }
  };

  const increaseQuantity = () => modifyQuantity(1);

  const decreaseQuantity = () => modifyQuantity(-1);

  return (
    <View style={cartStyles.container}>
      {quantity === 0 ? (
        <TouchableOpacity
          style={cartStyles.addButton}
          onPress={increaseQuantity}
        >
          <Icon name="plus" size={18} />
        </TouchableOpacity>
      ) : (
        <View style={cartStyles.quantityContainer}>
          <TouchableOpacity
            style={cartStyles.iconButton}
            onPress={decreaseQuantity}
          >
            {quantity === 1 ? (
              <MIcon name={"delete-outline"} color="#fff" size={18} />
            ) : (
              <Icon name={"minus"} color="#fff" size={18} />
            )}
          </TouchableOpacity>

          <Text style={cartStyles.quantityText}>{quantity}</Text>

          {quantity === MAX_QUANTITY_PER_ITEM ? (
            <View style={cartStyles.iconButton}>
              <MIcon name="cancel" color="#fff" size={18} />
            </View>
          ) : (
            <TouchableOpacity
              style={cartStyles.iconButton}
              onPress={increaseQuantity}
            >
              <Icon name="plus" color="#fff" size={18} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const cartStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  iconButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(232, 68, 66)",
    borderRadius: 16,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 5,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal: 2,
  },
});

export default AddToCart;

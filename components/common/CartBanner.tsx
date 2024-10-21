import { useSelector } from "react-redux";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useBottomNavigation } from "../../navigation/navigation";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";

const CartBanner = ({}: {}) => {
  const navigation = useBottomNavigation();
  const totalQuantity = useSelector(selectTotalQuantity);

  const handleViewCart = () => {
    navigation.navigate("Checkout");
  };

  if (totalQuantity === 0) return null;

  return (
    <View style={styles.stickyFooterContainer}>
      <Text style={styles.quantityText}>Cart Items: {totalQuantity}</Text>

      <TouchableOpacity style={styles.stickyPayButton} onPress={handleViewCart}>
        <Text style={styles.stickyPayButtonText}>Go to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartBanner;

const styles = StyleSheet.create({
  stickyFooterContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e6e8e6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100,
    backgroundColor: "white",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stickyPayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  stickyPayButtonText: {
    fontWeight: "bold",
  },
});

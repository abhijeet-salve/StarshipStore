import { View, StyleSheet } from "react-native";

const Divider = () => <View style={styles.divider} />;

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e6e8e6",
    marginVertical: 14,
  },
});

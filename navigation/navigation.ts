import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Checkout: undefined;
};

export const useBottomNavigation = () =>
  useNavigation<BottomTabNavigationProp<TabParamList>>();

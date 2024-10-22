import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Checkout: undefined;
};
export type StackParamList = {
  PaymentSuccess: undefined;
};

export const useTabNavigation = () => {
  return useNavigation<BottomTabNavigationProp<TabParamList>>();
};

export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<StackParamList>>();
};

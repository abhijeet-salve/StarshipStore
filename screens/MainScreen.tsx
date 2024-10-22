import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import CartIconWithBadge from './CustomCartIcon';
import CheckoutScreen from './CheckoutScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import PaymentScreen from './PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScreenWithNavigation = () => {
  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Search') iconName = 'search';

            if (route.name === 'Checkout')
              return <CartIconWithBadge color={color} />;

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Search' component={SearchScreen} />
        <Tab.Screen name='Checkout' component={CheckoutScreen} />
      </Tab.Navigator>
    </View>
  );
};

const MainScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainTabs'
          component={ScreenWithNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='PaymentSuccess'
          component={PaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

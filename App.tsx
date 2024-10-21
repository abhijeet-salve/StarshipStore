import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { StatusBar } from "react-native";
import MainScreen from "./screens/MainScreen";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <MainScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

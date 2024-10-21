import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import { StatusBar } from "react-native";
import MainScreen from "./components/MainScreen";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <MainScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

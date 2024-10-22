import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { StatusBar } from "react-native";
import MainScreen from "./screens/MainScreen";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <MainScreen />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

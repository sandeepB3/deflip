import React from "react";
import StackNavigator from "./navigation/StackNavigator.js";
import { Provider } from "react-redux";
import store from "./store/index.js";

export default App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );

}


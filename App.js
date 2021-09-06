import React from "react";
import { Provider } from "react-redux";
import store from "./src/features/store";

import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
}

import React from "react";
import { Provider } from "react-redux";

import "./src/config/api";
import AppNavigator from "./src/navigations/AppNavigator";
import { store } from "./src/features/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

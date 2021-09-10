import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen";
import Main from "../screens/Main";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="login" component={LoginScreen} /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="bottom"
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
}

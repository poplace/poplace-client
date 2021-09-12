import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen";
import NewAccount from "../components/NewAccount";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewAccount" component={NewAccount} options={{ headerShown: false }} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Bottom"
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
}

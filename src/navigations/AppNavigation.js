import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import NewAccount from "../components/NewAccount";
import SettingScreen from "../screens/SettingScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="newAccount" component={NewAccount} options={{ headerShown: false }} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="bottom"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="설정페이지" component={SettingScreen} />
    </Stack.Navigator>
  );
}

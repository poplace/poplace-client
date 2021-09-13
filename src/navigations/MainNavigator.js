import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";
import MorePageScreen from "../screens/MorePageScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen options={{ headerShown: true }} name="더보기" component={MorePageScreen} />
    </Stack.Navigator>
  );
}

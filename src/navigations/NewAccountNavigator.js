import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewProfileImageScreen from "../screens/NewProfileImageScreen";
import NewNicknameScreen from "../screens/NewNicknameScreen";

const Stack = createNativeStackNavigator();

export default function NewAccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewProfileImageScreen" component={NewProfileImageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewNicknameScreen" component={NewNicknameScreen} />
    </Stack.Navigator>
  );
}

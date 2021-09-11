import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewProfileImage from "./NewProfileImage";
import NewNickname from "./NewNickname";

const Stack = createNativeStackNavigator();

export default function NewAccount() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="newProfileImage"
        component={NewProfileImage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newNickname" component={NewNickname} />
    </Stack.Navigator>
  );
}

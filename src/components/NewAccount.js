import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewProfileImage from "./NewProfileImage";
import NewNickname from "./NewNickname";

const Stack = createNativeStackNavigator();

export default function NewAccount() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewProfileImage" component={NewProfileImage} />
      <Stack.Screen name="NewNickname" component={NewNickname} />
    </Stack.Navigator>
  );
}

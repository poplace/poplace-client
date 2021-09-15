import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import MainNavigator from "./MainNavigator";
import NewAccountNavigator from "./NewAccountNavigator";
import LoginScreen from "../screens/LoginScreen";
import { selectUser, signinUser } from "../features/userSlice";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ navigation }) {
  const dispatch = useDispatch();
  const { nickname } = useSelector(selectUser);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const email = await SecureStore.getItemAsync("email");

        await dispatch(signinUser({ email }));

        if (nickname) {
          return navigation.replace("MainNavigator");
        }

        if (email) {
          return navigation.replace("NewAccountNavigator");
        }
      } catch (err) {
        console.log(err);
      }
    }

    getUserInfo();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewAccountNavigator" component={NewAccountNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

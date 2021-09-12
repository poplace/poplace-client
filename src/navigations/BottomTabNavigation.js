import React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Main from "../screens/Main";
import MyPage from "../screens/MyPage";
import NewPin from "../screens/NewPin";
import DetailPin from "../screens/DetailPin";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={32} />,
        }}
      />
      <Tab.Screen
        name="핀 생성하기"
        component={NewPin}
        options={{
          headerLeft: () => (
            <Button title="뒤로"/>
          ),
          tabBarIcon: () => <AntDesign name="plus" size={32} />,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={32} />,
        }}
      />
    </Tab.Navigator>
  );
}

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Main from "../screens/Main";
import MyPage from "../screens/MyPage";
import NewPin from "../screens/NewPin";
import CustomBottomTabBarButton from "../components/CustomBottomTabBarButton";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={32} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="NewPin"
        component={NewPin}
        options={{
          tabBarIcon: () => <AntDesign name="plus" size={32} color="white" />,
          tabBarButton: (props) => <CustomBottomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={32} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "#F78582",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

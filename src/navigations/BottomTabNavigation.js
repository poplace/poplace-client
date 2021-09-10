import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
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
          tabBarIcon: () => <Ionicons name="home-outline" size={32} color="white" />,
        }}
      />
      <Tab.Screen
        name="핀 생성하기"
        component={NewPin}
        options={{
          tabBarIcon: () => <AntDesign name="plus" size={32} color="white" />,
          tabBarButton: (props) => <CustomBottomTabBarButton {...props} />,
          headerLeft: () => (
            <Button title="뒤로"/>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={32} />,
          title: "마이페이지",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#453536",
            textAlign: "center",
            fontWeight: "700",
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingContainer}
              activeOpacity={1}
              onPress={() => console.log("설정페이지로..")}>
              <Ionicons name="settings-sharp" size={26} color="#766162" />
            </TouchableOpacity>
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
  settingContainer: {
    flex: 1,
    justifyContent: "center",
    right: "10%",
  }
});

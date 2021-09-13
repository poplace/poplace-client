import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";
import NewPinScreen from "../screens/NewPinScreen";
import CustomBottomTabBarButton from "../components/CustomBottomTabBarButton";
import { color, verticalScale } from "../config/globalStyles";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={32} color="white" />,
        }}
      />
      <Tab.Screen
        name="핀 생성하기"
        component={NewPinScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <AntDesign name="plus" size={32} color="white" />,
          tabBarButton: (props) => <CustomBottomTabBarButton {...props} />,
          headerLeft: () => (
            <Button title="뒤로" />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <Ionicons name="person-outline" size={32} color="white" />,
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
    position: "absolute",
    height: verticalScale(70),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.poplaceRed,
    borderTopWidth: 0,
  },
  settingContainer: {
    flex: 1,
    justifyContent: "center",
    right: "10%",
  }
});